(function () {
  "use strict";

  const SCOPE = "https://www.googleapis.com/auth/drive.appdata";
  const FILE_NAME = "personal-learning-hub-progress.json";
  const API = "https://www.googleapis.com/drive/v3";
  const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
  const GRANT_KEY = "learningHubGoogleDriveGranted";
  let options;
  let tokenClient;
  let accessToken = "";
  let tokenExpiresAt = 0;
  let tokenExpiryTimer;
  let driveFileId = "";
  let syncTimer;
  let syncing = false;
  let queued = false;
  let pendingChanges = false;
  let lastSync = 0;
  let libraryPromise;

  function report(state, message) {
    if (options && options.onStatus) options.onStatus({ state, message });
  }

  function loadGoogleLibrary() {
    if (window.google && window.google.accounts && window.google.accounts.oauth2) return Promise.resolve();
    if (libraryPromise) return libraryPromise;
    libraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Google sign-in could not be loaded."));
      document.head.appendChild(script);
    });
    return libraryPromise;
  }

  function hasPreviousGrant() {
    return localStorage.getItem(GRANT_KEY) === "1";
  }

  function hasUsableToken() {
    return Boolean(accessToken) && Date.now() < tokenExpiresAt;
  }

  function pauseForResume() {
    accessToken = "";
    tokenExpiresAt = 0;
    clearTimeout(tokenExpiryTimer);
    report("expired", pendingChanges
      ? "Drive sync paused with changes saved on this device. Tap Resume Drive Sync."
      : "Drive sync paused. Tap Resume Drive Sync when you want to synchronize.");
  }

  function scheduleTokenExpiry(expiresInSeconds) {
    clearTimeout(tokenExpiryTimer);
    const lifetime = Math.max(0, Number(expiresInSeconds || 3600) * 1000);
    tokenExpiresAt = Date.now() + lifetime;
    tokenExpiryTimer = setTimeout(pauseForResume, Math.max(0, lifetime - 60000));
  }

  async function authorize() {
    await loadGoogleLibrary();
    if (!tokenClient) {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: options.clientId,
        scope: SCOPE,
        callback: () => {}
      });
    }
    return new Promise((resolve, reject) => {
      tokenClient.callback = response => {
        if (!response || response.error) {
          reject(new Error((response && response.error_description) || "Google authorization was not completed."));
          return;
        }
        accessToken = response.access_token;
        localStorage.setItem(GRANT_KEY, "1");
        scheduleTokenExpiry(response.expires_in);
        resolve();
      };
      tokenClient.error_callback = error => reject(new Error((error && error.message) || "The Google sign-in window was closed."));
      tokenClient.requestAccessToken({ prompt: hasPreviousGrant() ? "" : "consent" });
    });
  }

  async function driveFetch(url, init) {
    const response = await fetch(url, {
      ...(init || {}),
      headers: {
        Authorization: "Bearer " + accessToken,
        ...((init && init.headers) || {})
      }
    });
    if (response.status === 401) {
      pauseForResume();
      throw new Error("Google session expired.");
    }
    if (!response.ok) {
      let detail = "";
      try { detail = (await response.json()).error.message; } catch {}
      throw new Error(detail || "Google Drive returned an error.");
    }
    return response;
  }

  async function findProgressFile() {
    const params = new URLSearchParams({
      spaces: "appDataFolder",
      q: `name='${FILE_NAME}' and 'appDataFolder' in parents and trashed=false`,
      fields: "files(id,modifiedTime)",
      pageSize: "1"
    });
    const response = await driveFetch(API + "/files?" + params);
    const data = await response.json();
    driveFileId = data.files && data.files[0] ? data.files[0].id : "";
    return driveFileId;
  }

  async function readRemoteState() {
    if (!driveFileId && !(await findProgressFile())) return null;
    const response = await driveFetch(API + "/files/" + encodeURIComponent(driveFileId) + "?alt=media");
    return response.json();
  }

  async function writeRemoteState(state) {
    const body = JSON.stringify(state, null, 2);
    if (driveFileId) {
      await driveFetch(UPLOAD_API + "/files/" + encodeURIComponent(driveFileId) + "?uploadType=media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body
      });
      return;
    }
    const boundary = "learning_hub_" + Date.now();
    const multipart = [
      "--" + boundary,
      "Content-Type: application/json; charset=UTF-8",
      "",
      JSON.stringify({ name: FILE_NAME, parents: ["appDataFolder"] }),
      "--" + boundary,
      "Content-Type: application/json",
      "",
      body,
      "--" + boundary + "--"
    ].join("\r\n");
    const response = await driveFetch(UPLOAD_API + "/files?uploadType=multipart&fields=id", {
      method: "POST",
      headers: { "Content-Type": "multipart/related; boundary=" + boundary },
      body: multipart
    });
    driveFileId = (await response.json()).id;
  }

  function newer(a, b) {
    if (!a) return b;
    if (!b) return a;
    return String(a.updatedAt || "") >= String(b.updatedAt || "") ? a : b;
  }

  function mergeStates(local, remote) {
    const left = local && typeof local === "object" ? local : {};
    const right = remote && typeof remote === "object" ? remote : {};
    const lessonIds = new Set([
      ...Object.keys(left.lessons || {}),
      ...Object.keys(right.lessons || {})
    ]);
    const lessons = {};
    lessonIds.forEach(id => {
      lessons[id] = newer((left.lessons || {})[id], (right.lessons || {})[id]);
    });
    return {
      schemaVersion: 1,
      curriculumVersion: options.curriculumVersion,
      lessons,
      profile: newer(left.profile, right.profile) || null,
      updatedAt: new Date().toISOString()
    };
  }

  async function sync() {
    if (!hasUsableToken()) {
      if (accessToken) pauseForResume();
      else if (hasPreviousGrant()) report("expired", pendingChanges
        ? "Drive sync paused with changes saved on this device. Tap Resume Drive Sync."
        : "Drive sync paused. Tap Resume Drive Sync when you want to synchronize.");
      else report("disconnected", "Connect Google Drive to synchronize across devices.");
      return;
    }
    if (syncing) {
      queued = true;
      return;
    }
    syncing = true;
    report("syncing", "Synchronizing with Google Drive…");
    try {
      const local = options.getState();
      const remote = await readRemoteState();
      const merged = mergeStates(local, remote);
      options.applyState(merged);
      await writeRemoteState(merged);
      pendingChanges = false;
      lastSync = Date.now();
      report("connected", "Google Drive synchronized just now.");
    } catch (error) {
      if (accessToken) report("error", error.message || "Could not synchronize with Google Drive.");
    } finally {
      syncing = false;
      if (queued) {
        queued = false;
        sync();
      }
    }
  }

  async function connect() {
    report("connecting", hasPreviousGrant() ? "Resuming Google Drive sync…" : "Opening Google sign-in…");
    try {
      await authorize();
      report("connected", "Google Drive connected. Synchronizing…");
      await sync();
    } catch (error) {
      report("error", error.message || "Google Drive connection was not completed.");
    }
  }

  function notifyLocalChange() {
    pendingChanges = true;
    if (!hasUsableToken()) {
      if (hasPreviousGrant()) report("expired", "Changes saved on this device. Tap Resume Drive Sync to upload them.");
      return;
    }
    clearTimeout(syncTimer);
    syncTimer = setTimeout(sync, 800);
  }

  function init(initOptions) {
    options = initOptions;
    report(hasPreviousGrant() ? "expired" : "disconnected", hasPreviousGrant()
      ? "Drive sync is ready to resume. Tap Resume Drive Sync."
      : "Connect Google Drive to synchronize across devices.");
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && hasUsableToken() && Date.now() - lastSync > 30000) sync();
    });
    window.addEventListener("online", () => {
      if (hasUsableToken()) sync();
    });
  }

  window.GoogleDriveLearningSync = { init, connect, sync, notifyLocalChange, mergeStates };
}());

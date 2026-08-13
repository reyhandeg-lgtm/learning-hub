PERSONAL LEARNING HUB — PWA BUNDLE

Files:
- index.html
- curriculum.js (edit this file for future lesson/track updates)
- google-drive-config.js (public Google OAuth client ID)
- google-drive-sync.js (Google Drive synchronization)
- video-player.html (reusable native iPhone video player)
- forecasting-demand-overview.mp4 (optimized local training video)
- report.js and jspdf.umd.min.js (PDF learning reports)
- manifest.json
- sw.js
- icon-192.png
- icon-512.png

For a proper iPhone Home Screen web app, upload all files to the same HTTPS static website folder.
Then open the site in Safari and use Share > Add to Home Screen.

Progress is stored locally so the app continues to work offline. Tap Connect Google Drive on
each device to merge and synchronize progress, completion dates, and report details through
the app's private Google Drive application-data folder. Google access tokens are kept only in
memory, so the app may occasionally ask you to reconnect.
The app also includes Export Progress / Import Progress buttons for backup and restore.
Completed lessons can also be exported as a formatted, unofficial learning-record PDF.
Completion dates can be edited on completed lesson cards. PDF reports offer A4 or US Letter
paper size and include a user-entered course taker name.

CURRICULUM UPDATES
Add, remove, reorder, or edit tracks and lessons in curriculum.js. Keep an existing
lesson's id unchanged so completion progress survives an update. The app checks for
a fresh curriculum when online and falls back to its cached copy when offline.
For a lesson with both reading and video options, add a resources array containing a
label and URL for each choice. Both choices remain under one trackable lesson record.
Local MP4 lessons use video-player.html so iPhone can use its native full-screen player.
Keep each MP4 below GitHub's 25 MiB browser-upload limit and do not add MP4 files to the
service-worker ASSETS list; videos stream on demand rather than downloading at install.

Note:
Opening index.html directly from the iPhone Files app is fine for inspection, but the PWA/service-worker
features are designed for an HTTPS-hosted site.

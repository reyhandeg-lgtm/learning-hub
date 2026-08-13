(function () {
  "use strict";

  const COLORS = {
    green: [31, 92, 74],
    pale: [230, 240, 236],
    ink: [23, 33, 29],
    muted: [92, 105, 99],
    rule: [215, 224, 219],
    white: [255, 255, 255]
  };

  function ascii(value) {
    return String(value || "")
      .replace(/[–—−]/g, "-")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/→/g, "to")
      .replace(/·/g, "-")
      .replace(/±/g, "+/-")
      .replace(/&/g, "and")
      .replace(/[^\x20-\x7E]/g, "");
  }

  function cleanSummary(value) {
    return ascii(value)
      .replace(/^Opens the MIT PDF directly\.\s*/i, "")
      .replace(/^Opens the five-page MIT Marangoni-flow note directly for\s*/i, "Develop ")
      .replace(/^Opens directly on the Part I video\.\s*/i, "")
      .replace(/^Opens directly on the Part II video\.\s*/i, "")
      .replace(/^Read the introduction, results summary, and conclusions to\s*/i, "");
  }

  function formatDate(iso) {
    if (!iso) return "Date not recorded";
    const date = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(iso + "T12:00:00") : new Date(iso);
    if (Number.isNaN(date.getTime())) return "Date not recorded";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function buildLearningReport(options) {
    const jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) throw new Error("PDF generator is unavailable.");

    const curriculum = options.curriculum;
    const completedIds = new Set(options.completedIds || []);
    const completedAt = options.completedAt || {};
    const learner = options.learner || {};
    const completedLessons = curriculum.lessons.filter(x => completedIds.has(x.id));
    const trackById = new Map(curriculum.tracks.map(x => [x.id, x]));
    const activeTracks = curriculum.tracks.filter(t => completedLessons.some(x => x.track === t.id));
    const paperSize = options.paperSize === "letter" ? "letter" : "a4";
    const doc = new jsPDF({ unit: "mm", format: paperSize, orientation: "portrait", compress: true });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    doc.setProperties({
      title: "Professional Learning Record - " + ascii(learner.name || "Learner"),
      subject: "Self-directed professional learning record",
      author: ascii(learner.name || "Personal Learning Hub"),
      creator: "Personal Learning Hub"
    });

    function drawHeader(firstPage) {
      doc.setFillColor(...COLORS.green);
      doc.rect(0, 0, pageWidth, firstPage ? 45 : 20, "F");
      doc.setTextColor(...COLORS.white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(firstPage ? 20 : 11);
      doc.text(firstPage ? "Professional Learning Record" : "Professional Learning Record", margin, firstPage ? 19 : 12);
      if (firstPage) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Self-directed technical and business learning", margin, 28);
        doc.setFontSize(8.5);
        doc.text("Generated " + formatDate(options.generatedAt || new Date().toISOString()), margin, 36);
        y = 54;
      } else {
        y = 28;
      }
      doc.setTextColor(...COLORS.ink);
    }

    function newPage() {
      doc.addPage();
      drawHeader(false);
    }

    function ensure(height) {
      if (y + height > pageHeight - 20) newPage();
    }

    function wrapped(text, width, size, style) {
      doc.setFont("helvetica", style || "normal");
      doc.setFontSize(size);
      return doc.splitTextToSize(ascii(text), width);
    }

    drawHeader(true);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text(ascii(learner.name || "Learner name not provided"), margin, y);
    y += 7;
    if (learner.title) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.muted);
      doc.text(ascii(learner.title), margin, y);
      doc.setTextColor(...COLORS.ink);
      y += 8;
    } else {
      y += 2;
    }

    const boxGap = 5;
    const boxWidth = (contentWidth - boxGap * 2) / 3;
    const stats = [
      [String(completedLessons.length), "Lessons completed"],
      [String(activeTracks.length), "Learning tracks"],
      [curriculum.version, "Curriculum version"]
    ];
    stats.forEach((stat, index) => {
      const x = margin + index * (boxWidth + boxGap);
      doc.setFillColor(...COLORS.pale);
      doc.roundedRect(x, y, boxWidth, 22, 2, 2, "F");
      doc.setTextColor(...COLORS.green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text(ascii(stat[0]), x + 5, y + 9);
      doc.setTextColor(...COLORS.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(stat[1], x + 5, y + 16);
    });
    y += 30;

    doc.setFillColor(247, 249, 248);
    doc.setDrawColor(...COLORS.rule);
    doc.roundedRect(margin, y, contentWidth, 19, 2, 2, "FD");
    doc.setTextColor(...COLORS.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const note = doc.splitTextToSize(
      "This document is an unofficial record of self-directed learning. Completion is based on the learner's own tracking and is not a certificate, academic credit, or verification by the content providers.",
      contentWidth - 10
    );
    doc.text(note, margin + 5, y + 6);
    doc.setTextColor(...COLORS.ink);
    y += 28;

    activeTracks.forEach(track => {
      ensure(22);
      doc.setTextColor(...COLORS.green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(ascii(track.name), margin, y);
      y += 5;
      doc.setDrawColor(...COLORS.green);
      doc.setLineWidth(0.6);
      doc.line(margin, y, pageWidth - margin, y);
      y += 7;

      completedLessons.filter(x => x.track === track.id).forEach(lesson => {
        const titleLines = wrapped(lesson.title, contentWidth - 10, 11, "bold");
        const creatorLines = wrapped((lesson.creator || lesson.source) + " | " + lesson.source, contentWidth - 10, 8.5, "bold");
        const credentialLines = wrapped(lesson.credentials || "Source credentials not listed.", contentWidth - 10, 8.2, "normal");
        const summaryLines = wrapped(cleanSummary(lesson.description), contentWidth - 10, 8.5, "normal");
        const estimatedHeight = 13 + titleLines.length * 4.5 + creatorLines.length * 3.6 + credentialLines.length * 3.5 + summaryLines.length * 3.7 + 8;
        ensure(Math.min(estimatedHeight, 72));

        const startY = y;
        doc.setFillColor(252, 253, 252);
        doc.setDrawColor(...COLORS.rule);
        doc.roundedRect(margin, startY, contentWidth, estimatedHeight, 2, 2, "FD");
        y += 6;
        doc.setTextColor(...COLORS.ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(titleLines, margin + 5, y);
        y += titleLines.length * 4.5 + 1;

        doc.setTextColor(...COLORS.green);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(creatorLines, margin + 5, y);
        y += creatorLines.length * 3.6 + 1;

        doc.setTextColor(...COLORS.muted);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.2);
        doc.text(credentialLines, margin + 5, y);
        y += credentialLines.length * 3.5 + 2;

        doc.setTextColor(...COLORS.ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text("Learning summary", margin + 5, y);
        y += 3.7;
        doc.setFont("helvetica", "normal");
        doc.text(summaryLines, margin + 5, y);
        y += summaryLines.length * 3.7 + 2;

        doc.setTextColor(...COLORS.muted);
        doc.setFontSize(7.8);
        doc.text("Completion recorded: " + formatDate(completedAt[lesson.id]) + "   |   Format: " + ascii(lesson.mode) + "   |   Length: " + ascii(lesson.duration), margin + 5, y);
        doc.setTextColor(...COLORS.ink);
        y = startY + estimatedHeight + 5;
      });
      y += 2;
    });

    if (!completedLessons.length) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("No completed lessons were recorded when this report was generated.", margin, y);
    }

    const pages = doc.getNumberOfPages();
    for (let page = 1; page <= pages; page += 1) {
      doc.setPage(page);
      doc.setDrawColor(...COLORS.rule);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
      doc.setTextColor(...COLORS.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text("Personal Learning Hub - unofficial self-directed learning record", margin, pageHeight - 9);
      doc.text("Page " + page + " of " + pages, pageWidth - margin, pageHeight - 9, { align: "right" });
    }

    return doc;
  }

  window.buildLearningReport = buildLearningReport;
}());

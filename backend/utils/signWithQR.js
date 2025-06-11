const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("fontkit");
const { default: sizeOf } = require("image-size");
const path = require("path");

exports.createSignedPDFWithQRs = async (qrBuffers, labels, outputPath) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage();
  const fontBytes = fs.readFileSync(path.join(__dirname, "../assets/fonts/times.ttf"));
  const font = await pdfDoc.embedFont(fontBytes);

  const startX = 50;
  const pageWidth = page.getWidth();
  const maxX = pageWidth - startX;
  let currentY = page.getHeight() - 60;

  const qrWidth = 80;
  const spaceBetween = 10;

  const grouped = {}; 
  for (let i = 0; i < qrBuffers.length; i++) {
    const label = labels[i];
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(qrBuffers[i]);
  }

  for (const label of Object.keys(grouped)) {
    const buffers = grouped[label];

    page.drawText(label, {
      x: startX,
      y: currentY,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    currentY -= 100;

    let currentX = startX;
    let maxRowHeight = 0;

    for (const buffer of buffers) {
      const imageDims = sizeOf(buffer);
      const image = await pdfDoc.embedPng(buffer);

      const imgHeight = (qrWidth / imageDims.width) * imageDims.height;

      if (currentX + qrWidth > maxX) {
        currentX = startX;
        currentY -= maxRowHeight + 30; 
        maxRowHeight = 0;
      }

      page.drawImage(image, {
        x: currentX,
        y: currentY,
        width: qrWidth,
        height: imgHeight,
      });

      currentX += qrWidth + spaceBetween;
      if (imgHeight > maxRowHeight) maxRowHeight = imgHeight;
    }

    currentY -= maxRowHeight + 1;
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};

import fs from 'fs';
import { PDFDocumentFactory, PDFDocumentWriter, drawText } from 'pdf-lib';

async function addDiagonalWatermark(inputPath, outputPath, watermarkText) {
    // Read the input PDF document
    const inputPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocumentFactory.load(inputPdfBytes);

    // Get the size of the first page
    const firstPage = pdfDoc.getPages()[0];
    const { width, height } = firstPage.getSize();

    // Add a new page to the document
    const newPage = pdfDoc.addPage();
    newPage.setSize(width, height);

    // Draw the watermark text on the new page
    const fontSize = 72;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { x, y } = drawText(watermarkText, {
        x: 0,
        y: height / 2,
        size: fontSize,
        font,
        rotate: 45,
        colorRgb: [0.8, 0.8, 0.8],
    });

    // Add the new page to the document
    pdfDoc.addPage(newPage);

    // Write the output PDF document
    const pdfWriter = new PDFDocumentWriter(pdfDoc);
    const outputPdfBytes = await pdfWriter.getBytes();
    fs.writeFileSync(outputPath, outputPdfBytes);
}

// Example usage
addDiagonalWatermark('lingoda-copy.pdf.pdf', 'output.pdf', 'CONFIDENTIAL');

const fs = require('fs');
const PDFLib = require('pdf-lib');

async function pageRemover(pdfFilePath, pageNumbers) {
    // Read the PDF file
    const pdfBytes = fs.readFileSync(pdfFilePath);
    // Load the PDF document
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
    // Delete the specified pages
    pageNumbers.forEach((pageNumber) => pdfDoc.deletePage(pageNumber));
    // Serialize the PDF document to a new Buffer
    const updatedPdfBytes = await pdfDoc.save();

    return updatedPdfBytes;
}

// Example usage
const pdfFilePath = process.argv[2]; // Get the file path from the command line arguments
const pageNumbers = process.argv.slice(3).map(Number); // Get the page numbers from the command line arguments
pageRemover(pdfFilePath, pageNumbers)
    .then((updatedPdfBytes) => {
        // Save the updated PDF to a file
        fs.writeFileSync('output.pdf', updatedPdfBytes);
    })
    .catch((error) => {
        console.error(error);
    });

// export default pageRemover;
module.exports = {
    pageRemover,
}
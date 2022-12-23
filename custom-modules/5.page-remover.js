const fs = require('fs');
const PDFLib = require('pdf-lib');
const path = require("path");
const { PDFDocument } = require("pdf-lib")

async function singlePageRemover(pdfFilePath, pageNumber) {
    // pageNumbers = pageNumbers.split(",")
    // console.log(pageNumbers);
    
    // convert user page number to index numbers
    pageNumber = pageNumber - 1;
  
    // Read the PDF file
    const pdfBytes = fs.readFileSync(path.resolve(__dirname, pdfFilePath));
    // Load the PDF document
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
    // Delete the specified pages
    pdfDoc.removePage(pageNumber);
    // Serialize the PDF document to a new Buffer
    const updatedPdfBytes = await pdfDoc.save();

    fs.writeFileSync(path.resolve(__dirname, '../output/output.pdf'), updatedPdfBytes);
    // return updatedPdfBytes;
}

async function multiPageRemover(pdfFilePath, pageNumbers) {
    // split the array of strings by "," and convert each string to number.
    pageNumbers = (pageNumbers.split(",")).map(Number);
    
    // convert user page number to index numbers
    pageNumbers.forEach((num, index) => {
        pageNumbers[index] = num - 1;
    })

    // folder to save the output
    const outputDirectory = '../output'
    // Read the input PDF file from the file system
    const data = await fs.promises.readFile(path.resolve(__dirname, pdfFilePath));

    // Load the PDF document
    const readPdf = await PDFDocument.load(data);

    // Get the total number of pages in the PDF document
    const { length } = readPdf.getPages();

    let bytes = null;

    // Create a new PDF document
    const writePdf = await PDFDocument.create();

    // Iterate over each page in the PDF document
    for (let i = 0, n = length; i < n; i += 1) {
        // Copy the current page from the input PDF document to the new PDF document if the page number is not in pageNumbers list
        if (!pageNumbers.includes(i)) {
            const [page] = await writePdf.copyPages(readPdf, [i]);
            // Add the page to the new PDF document
            writePdf.addPage(page);
        }
    }
    // Serialize the new PDF document to a buffer
    bytes = await writePdf.save();

    // Generate the output file path for the current page
    const outputPath = path.join(path.resolve(__dirname, outputDirectory), `output.pdf`);

    // Write the PDF buffer to a file
    await fs.promises.writeFile(outputPath, bytes);
}

// async function pageRemover(pdfFilePath, pageNumbers) {
//     pageNumbers = pageNumbers.split(",")
//     console.log(pageNumbers);

//     // convert user page number to index numbers
//     pageNumbers.forEach((num, index) => {
//         pageNumbers[index] = num - 1;
//     })

//     console.log(pageNumbers);
//     // Read the PDF file
//     const pdfBytes = fs.readFileSync(path.resolve(__dirname, pdfFilePath));
//     // Load the PDF document
//     const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
//     // Delete the specified pages
//     pageNumbers.map((pageNumber) => pdfDoc.removePage(pageNumber));
//     // Serialize the PDF document to a new Buffer
//     const updatedPdfBytes = await pdfDoc.save();

//     fs.writeFileSync(path.resolve(__dirname, '../output/output.pdf'), updatedPdfBytes);
//     // return updatedPdfBytes;

// }

// Example usage
// const pdfFilePath = process.argv[2]; // Get the file path from the command line arguments
// const pageNumbers = process.argv.slice(3).map(Number); // Get the page numbers from the command line arguments
// pageRemover(pdfFilePath, pageNumbers)
//     .then((updatedPdfBytes) => {
//         // Save the updated PDF to a file
//         fs.writeFileSync('output.pdf', updatedPdfBytes);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// export default pageRemover;
module.exports = {
    singlePageRemover,
    multiPageRemover
}
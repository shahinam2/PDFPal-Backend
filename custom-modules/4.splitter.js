// source:
// https://www.labnol.org/split-pdf-file-220406
// import fs from 'fs';
// import path from 'path';
// import { PDFDocument } from 'pdf-lib';
const fs = require("fs")
const path = require("path");
const { PDFDocument } = require("pdf-lib")

// const outputDirectory = path.resolve(__dirname, '../output')
const outputDirectory = '../output'

// Define a function to split a PDF file into separate pages
const splitter = async (pdfFilePath) => {
    // Read the input PDF file from the file system
    const data = await fs.promises.readFile(path.resolve(__dirname, pdfFilePath));

    // Load the PDF document
    const readPdf = await PDFDocument.load(data);

    // Get the total number of pages in the PDF document
    const { length } = readPdf.getPages();

    // Iterate over each page in the PDF document
    for (let i = 0, n = length; i < n; i += 1) {
        // Create a new PDF document
        const writePdf = await PDFDocument.create();

        // Copy the current page from the input PDF document to the new PDF document
        const [page] = await writePdf.copyPages(readPdf, [i]);

        // Add the page to the new PDF document
        writePdf.addPage(page);

        // Serialize the new PDF document to a buffer
        const bytes = await writePdf.save();

        // Generate the output file path for the current page
        const outputPath = path.join(path.resolve(__dirname, outputDirectory), `Page${i + 1}.pdf`);

        // Write the PDF buffer to a file
        await fs.promises.writeFile(outputPath, bytes);
    }
};

// Split the PDF file specified as the first command line argument
// Save the splitted pages to the 'splitted-pdf' folder
// splitter(process.argv[2], 'splitted-pdf');
// splitter("../input/1.sample.pdf");

// export default splitter;
module.exports = {
    splitter,
}
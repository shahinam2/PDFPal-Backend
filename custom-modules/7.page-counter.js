const fs = require('fs');
const pdf = require('pdf-parse');
const path = require("path");
const colors = require("colors");

async function pageCounter(pdfFile) {
    // Read the PDF file into a Buffer
    const pdfBuffer = fs.readFileSync(path.resolve(__dirname, pdfFile));
    
    // Parse the PDF buffer
    pdf(pdfBuffer).then(function (data) {
        // Get the number of pages in the PDF file
        const numPages = data.numpages;
    
        console.log(`\nTotal number of pages: ${numPages}`.green);
    });
}

module.exports = {
    pageCounter,
}
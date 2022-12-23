// solution from:
// https://blog.logrocket.com/managing-pdfs-node-pdf-lib/#how-to-manage-pdfs-node-js-pdf-lib
const { PDFDocument } = require("pdf-lib")
const fs = require("fs");
const path = require('path');

async function merger(inputFiles) {
    // const inputFiles = process.argv.slice(2);  // Get the input file names from the command line arguments
    
    let pdfDoc = null;
    for (const inputFile of inputFiles) {
        // Load the PDF document
        // const pdf = await PDFDocument.load(fs.readFileSync(inputFile));
        
        let resolvedInputFile = fs.readFileSync(path.resolve(__dirname, inputFile))
        
        const pdf = await PDFDocument.load(resolvedInputFile);

        // If this is the first PDF document, use it as the base for the merged document
        if (!pdfDoc) {
            pdfDoc = pdf;
        } else {
            // Copy the pages from the current PDF document and add them to the merged document
            const pagesArray = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
            for (const page of pagesArray) {
                pdfDoc.addPage(page);
            }
        }
    }

    // Save the merged PDF document
    fs.writeFileSync(path.resolve(__dirname, "../output/merged.pdf"), await pdfDoc.save());
}

// merger().catch((err) => console.log(err));

// export default mergePDF;
module.exports = {
    merger,
}
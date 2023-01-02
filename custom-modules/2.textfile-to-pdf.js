const fs = require('fs');
const puppeteer = require('puppeteer');

async function textToPdf(textFilePath) {
    // Read the text file
    const text = fs.readFileSync(textFilePath, 'utf8');

    // Launch a headless Chrome browser
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    // Set the content of the page to the text file
    await page.setContent(text);
    // Generate a PDF of the page
    const pdf = await page.pdf();
    // Close the browser
    await browser.close();

    return pdf;
}

// To use this module in standalone mode:
// node textfile-to-pdf.js input.txt

// export default textToPdf;
module.exports = {
    textToPdf,
}
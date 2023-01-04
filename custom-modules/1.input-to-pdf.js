const readline = require("readline")
const fs = require("fs")
const PDFDocument = require("pdfkit")
const colors = require("colors");

async function inputToPDF() {
    // Create a readline interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        raw: true,
    });

    // Create a new PDF document
    const doc = new PDFDocument();
    // write pdf to ./output/output.pdf
    doc.pipe(fs.createWriteStream('./output/output.pdf')); 

    // Initialize an empty string for storing inputted text
    let text = '';

    // Set up an event listener for the 'line' event, which is triggered every time the user inputs a line of text
    rl.on('line', (line) => {
        // Append the inputted line of text to the text string, with a newline character at the end
        text += line + '\n';
    });

    // Set up an event listener for the 'SIGINT' event, which is triggered when the user presses 'CTRL + C' in the command line
    rl.on('SIGINT', () => {
        // Close the readline interface
        rl.close();
    });

    // Set up an event listener for the 'close' event, which is triggered when the readline interface is closed
    rl.on('close', () => {
        // Add the text to the PDF document
        doc.text(text);
        // End the PDF document and save it to a file
        doc.end();

        // Print a green colored message to the console indicating that the PDF file has been created
        console.log('PDF file created: output.pdf'.green);
    });

    console.log(`Enter your text below. 
To go to a new line press enter.
When you are done writting your text, Press "Enter" and then "CTRL + C" to exit and save.`);
}

// export default inputToPDF;
module.exports = {
    inputToPDF,
}
const readline = require('readline');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    raw: true,
});

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output.pdf'));

let text = '';

rl.on('line', (line) => {
    text += line + '\n';
});

rl.on('SIGINT', () => {
    rl.close();
});

rl.on('close', () => {
    doc.text(text);
    doc.end();

    console.log('PDF file created: output.pdf');
});

console.log(`Enter your text below. 
To go to a new line press enter.
When you are done writting your text, Press "Enter" and then "CTRL + C" to exit and save.`);

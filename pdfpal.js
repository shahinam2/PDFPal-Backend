#!/usr/bin/env node

// import * as dotenv from 'dotenv'
// dotenv.config({ path: "./config/.env" })

// Custom Modules Imports:
const { inputToPDF } = require('./custom-modules/1.input-to-pdf')
const { textToPdf } = require("./custom-modules/2.textfile-to-pdf")
const { merger } = require("./custom-modules/3.merger")
const { splitter } = require("./custom-modules/4.splitter")
// const pageRemover = require("./custom-modules/5.page-remover")
// const pdfToJPG = require("./custom-modules/6.pdf-to-jpg")
// const pageCounter = require("./custom-modules/7.page-counter")
// const zipper = require("./custom-modules/8.zipper")
// const mailer = require("./custom-modules/9.mailer")

// imports for pdfpal.js:
const colors = require("colors");
const readlineSync = require('readline-sync');
const fs = require('fs');
const glob = require('glob');
const path = require('path');



console.clear()
console.log(colors.rainbow(`
╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ╔═╗╔╦╗╔═╗╔═╗┌─┐┬  ┬
║║║├┤ │  │  │ ││││├┤    │ │ │  ╠═╝ ║║╠╣ ╠═╝├─┤│  │
╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘  ╩  ═╩╝╚  ╩  ┴ ┴┴─┘o
`));

console.log(`
PDFPal is capable of:
    1. Convert multiline input & convert it to a PDF file.
    2. Convert a Text file into a PDF file.
    3. Merge multiple PDFs.
    4. Split a PDF into separate PDFs.
    5. Remove a PDF page.
    6. Convert a PDF to JPG files.
    7. Count the number of PDF pages.
    8. Zip the pdf file.
    9. Email the PDF file. \n`);

// Accept input number from user
let userChoice = readlineSync.question('Enter the number of tool to get its instructions: ');
console.log("\n");

function startFresh() {
    const outputFolder = 'output';
    // Find all files in the output folder
    glob(`${outputFolder}/*`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        // Loop through the files and delete them
        files.forEach((file) => {
            fs.unlink(file, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(unlinkErr);
                }
            });
        });
    });
}

switch (userChoice) {
    case '1':
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            startFresh()
            inputToPDF()
        }
        break;
    case '2':
        console.log("Please place your text file in input folder.");
        readlineSync.question("when you are ready press enter.")
        const fileName = readlineSync.question("What is the name of your text file? ")
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            startFresh()
            textToPdf(`./input/${fileName}`)
                .then((pdf) => {
                    // Save the PDF to a file
                    fs.writeFileSync('./output/output.pdf', pdf);
                    console.log("Your file has been converted successfully.".green);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        break;
    case '3':
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            console.log(`
    Please place the PDF files that you want to be merged into input folder.
    Make sure only the PDF files which you want to be merged are in input directory.
    If the merge order matters, then add a number to the beginning of each file.
    e.g:
        1.myfile.pdf
        2.receipt.pdf
        3.result.pdf
            `);
            readlineSync.question("Press enter when you are ready.")
            startFresh();

            // get the names of the pdf files from input directory
            const fileNames = fs.readdirSync("./input")
                .map((file) => `../input/${path.parse(file).name}.pdf`);

            merger(fileNames.slice(" ")).catch((err) => console.log(err));

            console.log(`Your PDFs have merged successfully.`.green);
        }
        break;
    case '4':

        break;
    default:
        console.log('Invalid input. your input should be number between 1-9.');
}


// custom modules:
// inputToPDF();
// textToPdf();
// merger();
// splitter()
// pageRemover()
// pdfToJPG()
// pageCounter()
// zipper()
// mailer()



// TODO:
// create a user menu which looks like this:
// 1. User Text to PDF -- done
// 2. Text file to PDF -- done
// 5. Merge PDFs -- done
// 6. Split a PDF into multiple PDFs -- Done
// 4. Delete a PDF page -- done
// 7. Convert PDF into multiple JPG files -- Done
// 3. Count the number of pages -- done 
// //8. Compress PDF -- it works but its destructive! -- cancelled
// 9. Zip PDF -- Done
// 10. Email the output as a zip file -- Done

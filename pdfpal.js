#!/usr/bin/env node

// Custom Modules Imports:
const { inputToPDF } = require('./custom-modules/1.input-to-pdf')
const { textToPdf } = require("./custom-modules/2.textfile-to-pdf")
const { merger } = require("./custom-modules/3.merger")
const { splitter } = require("./custom-modules/4.splitter")
const { singlePageRemover, multiPageRemover } = require("./custom-modules/5.page-remover")
const { pdfToJPG } = require("./custom-modules/6.pdf-to-jpg")
const { pageCounter } = require("./custom-modules/7.page-counter")
const { zipper } = require("./custom-modules/8.zipper")
const { mailer } = require("./custom-modules/9.mailer")

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
1. Convert multiline input to a PDF file.
2. Convert a Text file into a PDF file.
3. Merge multiple PDFs.
4. Split a PDF into separate PDFs.
5. Remove PDF page(s).
6. Convert a PDF to JPG files.
7. Count the number of PDF pages.
8. Zip the files in output directory.
9. Email the PDF file. \n`);

// Accept input number from user
let userChoice = readlineSync.question('Enter the number of tool to get its instructions: ');
console.log("\n");

async function startFresh() {
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

function fileNamesList() {
    const fileNames = fs.readdirSync("./input")
        .map((file) => `../input/${path.parse(file).name}.pdf`);
    return fileNames;
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

            merger(
                // get the names of the pdf files from input directory
                fileNamesList()
            )
                .catch((err) => console.log(err)
                );

            console.log(`Your PDFs have merged successfully.`.green);
        }
        break;
    case '4':
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            console.log("Place the PDF that you want to split in input directory.");
            readlineSync.question("Press enter when you are ready.")
            startFresh()
            splitter(fileNamesList().join(""))
            console.log(`Your PDF has been splitted successfully!`.green);
        }
        break;
    case '5':
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            console.log("\nDo you want to remove a single page or multiple pages?");
            if (readlineSync.question("For single page press s and and for multiple pages press m then press enter. ") === "s") {
                // remove single page
                readlineSync.question("\nPlace your PDF file in input folder.\nWhen you are ready press enter.")
                const pageToRemove = readlineSync.question("\nWhich page do you want to remove? \nexample input: 3\n")
                startFresh()
                singlePageRemover(fileNamesList().join(""), pageToRemove)
                console.log(`\nPage ${pageToRemove} was remove successfully.`.green);
            }
            else {
                // remove multiple page
                readlineSync.question("\nPlace your PDF file in input folder.\nWhen you are ready press enter.")
                const pagesToRemove = readlineSync.question("\nWhich pages do you want to remove? \nexample input: 1,2,3\n")
                startFresh()
                multiPageRemover(fileNamesList().join(""), pagesToRemove)
                console.log(`\nPages ${pagesToRemove} were removed successfully.`.green);
            }
        }
        break;
    case '6':
        if (readlineSync.question("Attention! To keep things tidy, any file in output directory will be removed. if it's ok press y and then enter. ".red) === 'y') {
            if (readlineSync.question("\nPDFPal relies on poppler-utils in order to convert PDF to JPG.\nIf poppler-utils is not installed on your system, it will be installed in the next step.\nIf its ok, press y and enter. ") === 'y') {
                console.log("\nPlace the PDF that you want to convert to jpg files in input directory.");
                const pageRange = readlineSync.question("Which range of pages do you want to convert?\nExample input: 1-10\n")
                startFresh()
                pdfToJPG(fileNamesList().join(""), pageRange)
                console.log(`\nYour PDF has been converted successfully!`.green);
            }
        }
        break;
    case '7':
        readlineSync.question("Place the PDF file that you want to know its number of pages in input directory and then press enter.")
        pageCounter(fileNamesList().join(""));

        break;
    case '8':
        if (readlineSync.question("Any file in output directory will be zipped as output.zip. if its ok press y and then press enter. ") === "y") {
            zipper();
        }
        break;
    case '9':
        console.log("PDFPal relies on google mail server(gmail) to send emails.\nIn order to use this service you should create an 'App password' and put it inside the following path: \n./config/.env\nWith the following format:\npassword=your-password-here\n\nIn order to get the 'App password' you can refer to the following video:\nhttps://www.youtube.com/watch?v=uVDq4VOBMNM\n");
        const fileToMail = readlineSync.question("What is the name of the file in output directory that you want to mail? (e.g output.zip) ")
        const senderEmailAdress = readlineSync.question("What is your email address: ")
        const receiverEmailAddress = readlineSync.question("What is the email of the receiver: ")
        const emailSubject = readlineSync.question("What is the subject of the email: ")
        const emailContent = readlineSync.question("What is the content of your email: ")
        mailer(fileToMail, senderEmailAdress, receiverEmailAddress, emailSubject, emailContent)
        break;
    default:
        console.log('Invalid input. your input should be number between 1-9.');
}
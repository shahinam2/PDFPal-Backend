const { spawn } = require("child_process")
const { execSync } = require('child_process');
const path = require("path");
// const fs = require("fs")
// const { spawn } = require('child_process');
// import { spawn } from 'child_process';
// import fs from 'fs';

// const pdfFile = 'lingoda.pdf';
// const imagePrefix = 'image';
// const outputDirectory = '../output';

async function pdfToJPG(pdfFile, pageRange) {
    // check if poppler-utils is installed
    try {
        execSync('which pdftoppm');
        console.log('poppler-utils is already installed.');
    } catch (error) {
        console.log('Installing poppler-utils...');
        execSync('sudo apt install poppler-utils -y');
        console.log('poppler-utils has been installed');
    }

    // convert pageRange to start and end of the range
    const rangeStart = pageRange.split("-")[0]
    const rangeEnd = pageRange.split("-")[1]
    
    // resolve the pdfFile
    const resolvedPDFFile = path.resolve(__dirname, pdfFile)
    const resolvedOutput = path.resolve(__dirname, '../output/image')

    // example of converting from page 2 to 4
    // pdftoppm input.pdf output -jpeg -f 2 -l 4
    const pdftoppm = spawn('pdftoppm', [resolvedPDFFile, resolvedOutput, '-jpeg', "-f", rangeStart, '-l', rangeEnd]);
    // console.log(pdftoppm);

    // pdftoppm.stdout.on('data', (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // pdftoppm.stderr.on('data', (data) => { });
    // console.log(`stderr: ${data}`);

    // pdftoppm.on('close', (code) => { });
    // console.log(`child process exited with code ${code}`);
}

// export default pdfToJPG;
module.exports = {
    pdfToJPG,
}

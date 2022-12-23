const spawn = require("child_process")
const fs = require("fs")
// import { spawn } from 'child_process';
// import fs from 'fs';

const pdfFile = 'lingoda.pdf';
const imagePrefix = 'image';
const outputDirectory = 'output';

async function pdfToJPG() {
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
        console.log(`${outputDirectory} folder created.`);
    }
    
    const pdftoppm = spawn('pdftoppm', ['-jpeg', pdfFile, `${outputDirectory}/${imagePrefix}`]);
    
    pdftoppm.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    pdftoppm.stderr.on('data', (data) => {});
    // console.log(`stderr: ${data}`);
    
    pdftoppm.on('close', (code) => {});
    // console.log(`child process exited with code ${code}`);
}

// export default pdfToJPG;
module.exports = {
    pdfToJPG,
}

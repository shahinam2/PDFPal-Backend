const { spawn } = require("child_process")
const { execSync } = require('child_process');
const path = require("path");

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
    spawn('pdftoppm', [resolvedPDFFile, resolvedOutput, '-jpeg', "-f", rangeStart, '-l', rangeEnd]);
}

// export default pdfToJPG;
module.exports = {
    pdfToJPG,
}

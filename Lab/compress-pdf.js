// alternative solution:
// https://github.com/aklomp/shrinkpdf

import { exec } from 'child_process';

const inputFile = process.argv[2];
const outputFile = 'shrinked-output.pdf';

exec(`./shrinkpdf.sh -r 90 -o ${outputFile} ${inputFile}`, (error, stdout, stderr) => {
    if (error) {
        // console.error(`exec error: ${error}`);
        return;
    }
    // console.log(`stdout: ${stdout}`);
    // console.error(`stderr: ${stderr}`);
});

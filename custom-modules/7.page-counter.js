const pdf = require('pdf-page-counter');
const fs = require('fs');

// readFileSync returns the contents of the path.
// process.argv[2] returns the index 2 of options:
// (index 0)  (index 1)         (index 2)    
// node       count-pages.js    test.pdf
let pdfFile = fs.readFileSync(`${process.argv[2]}`);

async function pageCounter() {
    pdf(pdfFile).then((data) => {
        // number of pages
        console.log(`The PDF has ${data.numpages} page(s).`);
    });
}

// export default pageCounter;
module.exports = {
    pageCounter,
}
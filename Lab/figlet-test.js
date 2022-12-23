var figlet = require('figlet');
const colors = require('colors')

figlet('Welcome to PDFPal!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.rainbow)
});
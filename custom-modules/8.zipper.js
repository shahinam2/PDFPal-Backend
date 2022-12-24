// Source:
// https://www.digitalocean.com/community/tutorials/how-to-work-with-zip-files-in-node-js#step-2-creating-a-zip-archive

// Import the AdmZip module
// import AdmZip from "adm-zip";
const AdmZip = require("adm-zip")
const path = require("path");
const colors = require("colors");

// Declare an async function that creates a zip archive
async function zipper() {
    // Try to create the zip archive
    try {
        // Create a new AdmZip instance
        const zip = new AdmZip();
        // Set the output file name for the zip archive
        const outputFile = path.resolve(__dirname, "../output/output.zip");
        // Add the contents of the "output" folder to the zip archive
        zip.addLocalFolder(path.resolve(__dirname, "../output"));
        // Write the zip archive to the output file
        zip.writeZip(outputFile);
        // Log a message to the console indicating that the zip archive was created successfully
        console.log(`\nOutput.zip was successfully created.`.green);
        // If an error occurs, catch it and log a message to the console
    } catch (e) {
        console.log(`Something went wrong. ${e}`);
    }
}

// Call the createZipArchive function
// createZipArchive();

module.exports = {
    zipper,
}
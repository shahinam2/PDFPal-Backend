import { franc } from "franc";
import langs from "langs";
import colors from "colors"

let userInput = process.argv[2];
let langCode = franc(userInput);
if (langCode === 'und') {
    console.log("Sorry, Couldn't figure it out. Try with more sample text".red);
} else {
    let language = langs.where("3", langCode);
    console.log(colors.green(`My best guess is: ${language.name}`));
}

// // langs.all();
// console.log(detectedLang);

// import { createRequire } from "module";
// const require = createRequire(import.meta.url)
// import { franc } from "franc";
// import langs from "langs";
// // const langs = require('langs');
// const langCode = franc("this is a test");
// const language = langs.where("3", langCode);
// console.log(language.name);
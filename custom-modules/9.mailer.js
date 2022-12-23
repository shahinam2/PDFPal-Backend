// Source:
// https://www.w3schools.com/nodejs/nodejs_email.asp
// https://nodemailer.com/message/attachments/

// In order to make this code work, 2 things should be prepared in advance:
// 1. Your email password should be added in /config/confing.json
// 2. You should get an "App passwords" for your google account.
// to get an "App passwords", watch the following video:
// https://www.youtube.com/watch?v=uVDq4VOBMNM
// import * as dotenv from 'dotenv'

// dotenv.config({ path: "../config/.env" })
// import { readFileSync } from "fs"
// import { createTransport } from 'nodemailer';
const dotenv = require("dotenv");
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, "../config/.env") })
const fs = require("fs");
const { createTransport } = require("nodemailer");

// const config = JSON.parse(fs.readFileSync('../config/config.json'));
// export const config = JSON.parse(readFileSync('../config/config.json'));
// const config = process.env.password;

// const password = config.password;
// console.log(typeof password);
// console.log(password);
async function mailer() {
    const password = process.env.password;
    
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'senerso2019@gmail.com',
            pass: password
        }
    });
    
    const mailOptions = {
        from: 'senerso2019@gmail.com',
        to: 'shahin.ccie1989@gmail.com',
        subject: 'Your PDF has arrived!',
        text: 'Your zipped PDF is attached below.',
        attachments: [{
            path: path.resolve(__dirname, "./output/output.zip")
        }]
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email was sent successfully!');
            // console.log('Email sent successfully!' + info.response);
        }
    });
}

// export default mailer;
module.exports = {
    mailer,
}


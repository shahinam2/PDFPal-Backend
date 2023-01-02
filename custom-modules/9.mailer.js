// Source:
// https://www.w3schools.com/nodejs/nodejs_email.asp
// https://nodemailer.com/message/attachments/

// In order to make this code work, 2 things should be prepared in advance:
// 1. Your email password should be added in /config/confing.json
// 2. You should get an "App passwords" for your google account.
// to get an "App passwords", watch the following video:
// https://www.youtube.com/watch?v=uVDq4VOBMNM
// import * as dotenv from 'dotenv'

const dotenv = require("dotenv");
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, "../config/.env") })
const fs = require("fs");
const { createTransport } = require("nodemailer");
const colors = require("colors");

async function mailer(fileToMail, senderEmailAdress, receiverEmailAddress, emailSubject, emailContent) {
    const password = process.env.password;
    
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: senderEmailAdress,
            pass: password
        }
    });
    
    const mailOptions = {
        from: senderEmailAdress,
        to: receiverEmailAddress,
        subject: emailSubject,
        text: emailContent,
        attachments: [{
            path: path.resolve(__dirname, `../output/${fileToMail}`)
        }]
    };

    console.log("\nYour email is being sent!".yellow);
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('\nYour email was sent successfully!'.green);
        }
    });
}

// export default mailer;
module.exports = {
    mailer,
}


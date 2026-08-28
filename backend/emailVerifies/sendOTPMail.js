import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Filename - index.js
export const sendOTPMail = async (otp, email) => {
    let mailTransporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }
    );

    let mailDetails = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'otp for password',
        html: `your otp for passwor reset ${otp}`
    };

    mailTransporter.sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('opt sent successfully');
            }
        });
}






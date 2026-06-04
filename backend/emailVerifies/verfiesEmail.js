import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Filename - index.js
export const sendEmail = async (token, email) => {
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
        subject: 'Test mail',
        text: `you are recently visited our website and you are requested to verify your email by using this token http://localhost:5173/verify/${token}`
    };

    mailTransporter.sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
}






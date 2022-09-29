const nodemailer = require('nodemailer');

// returns boolean whether sent or not
exports.sendEmail = function sendEmail(body, sender) {
    if (sender.length === 0) {
        return { success: false, message: 'There must be a sender email.' };
    }
    console.log(process.env.GMAIL_EMAIL, process.env.GMAIL_PASSWORD)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: sender,
        to: 'sladehirsc@gmail.com',
        subject: 'From Web App',
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { success: false, message: 'There was an error sending the email with nodemailer.' };
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return { success: true, message: '' };
}
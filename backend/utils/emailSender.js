const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user:  process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

//console.log( process.env.EMAIL)
function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info.response);
      }
    });
  });
}

module.exports = sendEmail;

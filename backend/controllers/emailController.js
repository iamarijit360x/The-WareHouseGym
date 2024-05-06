
const nodemailer = require('nodemailer');
async function sendEmail(mailOptions) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD // Assuming you have stored your email password in an environment variable
    }
  });

  try {
    // Send email using the transporter
    await transporter.sendMail(mailOptions);
    //console.log('Email sent successfully');
  } catch (error) {
   // console.error('Error sending email:', error);
    throw error; // Throw the error to be handled by the caller
  }
}

module.exports = sendEmail; // Export the sendEmail function

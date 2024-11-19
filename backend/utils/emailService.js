const nodemailer = require('nodemailer');

const sendAlert = async (email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Website Downtime Alert',
    text: message,
  });
};

module.exports = sendAlert;

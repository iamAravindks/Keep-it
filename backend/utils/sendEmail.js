import nodemailer from "nodemailer";
import config from "../config.js";
const sendEmail = async(options) => {
  // create a transporter
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_USER_PASS } = config;
  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_USER_PASS,
    },
  });
    
    // define mail options

    const mailOptions = {
        from: 'Aravind from keep-it',
        to: options.email,
        subject: options.subject,
        text:options.message
    }

    // send the mail

    await transport.sendMail(mailOptions)
};

export default sendEmail
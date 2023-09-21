const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const mailer = async(email, token)=> {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email, // list of receivers
    subject: "OTP Verification",
    html: `<p>This is your token <strong>${token}</strong></p>`,
  });

  return info.messageId;
}

module.exports = {mailer}

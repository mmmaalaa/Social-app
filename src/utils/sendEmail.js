import nodemailer from "nodemailer";
import sendEmailTemplate from "./sendEmailTemplate.js";

const sender = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: sender,
    pass: pass,
  },
});

const sendEmail = async (user, subject, html) => {
  await transporter.sendMail({
    from: `"Social Media APP "<${sender}>`,
    to: user,
    subject,
    html,
  });
};
export const subject = {
  activateAccount: "Active your account",
};

export default sendEmail;

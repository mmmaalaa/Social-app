import { EventEmitter } from "events";
import sendEmail, { subject } from "./sendEmail.js";
import sendEmailTemplate from "./sendEmailTemplate.js";

const emailEmitter = new EventEmitter();
emailEmitter.on("sendEmail", async (email, otp) => {
  
  await sendEmail(
    email,
    subject.activateAccount,
    sendEmailTemplate(email, otp)
  );
});



export default emailEmitter;
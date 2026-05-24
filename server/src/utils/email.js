import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmail.user,
    pass: config.gmail.appPassword,
  },
});

async function sendEmail(recipient, { subject, body }) {
  try {
    await transporter.sendMail({
      from: `"No Reply" <${config.gmail.user}>`,
      to: recipient,
      subject,
      html: body,
    });
    return { success: true };
  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: err };
  }
}

export default sendEmail;
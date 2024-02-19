import * as nodemailer from "nodemailer";
import { EmailContent, UserProgramInfo } from "./types";

export async function sendEmail({
  userProgramInfo,
  emailContent,
  sendFeedbackLink,
}: {
  userProgramInfo: UserProgramInfo[];
  emailContent: EmailContent;
  sendFeedbackLink: boolean;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  for (const {
    user_email: email,
    userTrainingId: trainingProgramId,
  } of userProgramInfo) {
    let feedbackLink = "";
    if (sendFeedbackLink) {
      const feedbackFormLink = `http://localhost:5173/feedback/training/${trainingProgramId}`;
      feedbackLink = `<a href="${feedbackFormLink}">${feedbackFormLink}</a>`;
    }

    const mailOptions = {
      from: `"Trackin" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: emailContent.subject,
      html: `
        <p>Dear User,</p>
        <p>I hope this email finds you well! 😊</p>
        <p>${emailContent.header}</p>
        <p>${emailContent.body}</p>
        ${feedbackLink ? `<p>Feedback Form Link: ${feedbackLink}</p>` : ""}
        <p>${emailContent.footer}</p>
        <p>Looking forward to hearing from you!</p>
        <p>Best regards,<br>Trackin Team</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Message sent to ${email}: %s`, info.messageId);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
}
export { EmailContent };

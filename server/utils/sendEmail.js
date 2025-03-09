import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    if (!to || !subject || !text) {
      throw new Error("Missing required email parameters (to, subject, text )");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });
    
    const mailOptions = {
      from: `"SecureConnect.lk" <${process.env.SMTP_USER || "secureconnect@spiritx.com"}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message, {
      stack: error.stack,
      smtpConfig: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
      },
    });
    throw new Error("Failed to send email. Please check the configuration and parameters.");
  }
};

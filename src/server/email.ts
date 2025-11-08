import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD is not set");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const t = getTransporter();

  await t.sendMail({
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
}

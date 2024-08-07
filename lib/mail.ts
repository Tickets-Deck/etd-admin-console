import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

type Mail = {
  to: string;
  name: string;
  subject: string;
  body: string;
  bcc?: string;
  attachments?: { filename: string; content: Buffer | string; }[];
};

export async function sendMail({
  to,
  name,
  subject,
  body,
  bcc,
  attachments,
}: Mail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    // Verify connection configuration
    const testResult = await transport.verify();
    // Log test result
    console.log("Transporter test result: ", testResult);
  } catch (error) {
    console.error(error);
  }

  try {
    if (attachments) {
      const sendMail = await transport.sendMail({
        from: SMTP_EMAIL,
        to,
        bcc,
        subject,
        html: body,
        attachments: [
          {
            filename: attachments[0].filename,
            content: attachments[0].content,
          },
        ],
      });

      return sendMail;
    }

    const sendMail = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      bcc,
      subject,
      html: body,
    });
    return sendMail;
  } catch (error) {
    console.error(error);
  }
}

// export function compileNewsletterSubscriptionTemplate(email: string) {
//   const template = handlebars.compile(newsletterSubscriptionTemplate);
//   const htmlBody = template({ email });

//   return htmlBody;
// }
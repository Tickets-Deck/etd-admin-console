import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { thankYouTemplate } from "./templates/thankYou";
import { htmlToPlainText } from "@/utils/convertHtmlToText";

type Mail = {
  to: string;
  name: string;
  subject: string;
  body: string;
  bcc?: string;
  attachments?: { filename: string; content: Buffer | string }[];
};

type MassMail = {
  to: string[];
  //   name: string;
  subject: string;
  body: string;
  bcc?: string;
  attachments?: { filename: string; content: Buffer | string }[];
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

export async function sendMassMail({
  to,
  //   name,
  subject,
  body,
  bcc,
  attachments,
}: MassMail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Transporter test result: ", testResult);
  } catch (error) {
    console.error(error);
  }

  try {
    const sendMail = await transport.sendMail({
      from: SMTP_EMAIL,
      to: "customer@ticketsdeckevents.com",
      bcc: to,
      subject,
      html: body,
    });
    return sendMail;
  } catch (error) {
    console.error(error);
  }

  //   try {
  //     const sendPromises = to.map(async (recipient) => {
  //       const mailOptions: any = {
  //         from: SMTP_EMAIL,
  //         to: recipient,
  //         bcc,
  //         subject,
  //         html: body,
  //       };

  //       if (attachments) {
  //         mailOptions.attachments = [
  //           {
  //             filename: attachments[0].filename,
  //             content: attachments[0].content,
  //           },
  //         ];
  //       }

  //       return await transport.sendMail(mailOptions);
  //     });

  //     // Wait for all emails to be sent
  //     const sendResults = await Promise.all(sendPromises);

  //     console.log("All emails sent successfully: ", sendResults);

  //     return sendResults;
  //   } catch (error) {
  //     console.error(error);
  //   }
}

export function compileThankYouTemplate({
  emailBody,
  eventName,
}: {
  emailBody: string;
  eventName: string;
}) {
  const template = handlebars.compile(thankYouTemplate);

  // convert event body html content to text
  const updatedEventDescription = htmlToPlainText(emailBody);

  console.log("updatedEventDescription", updatedEventDescription);

  const htmlBody = template({
    emailBody: updatedEventDescription,
    eventName,
  });

  return htmlBody;
}

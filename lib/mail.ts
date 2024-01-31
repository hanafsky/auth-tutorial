import nodemailer from "nodemailer";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const smtpConfig = {
    host: process.env.MAILHOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS 
    }
};

const transporter = nodemailer.createTransport(smtpConfig);



export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    const mailOptions: MailOptions = {
        from: "redox@info.sei.co.jp",
        to: email,
        subject: "Confirm your email",
        text: "",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    }

    try {
        const mailinfo = await transporter.sendMail(mailOptions)
        console.log(`Message sent: ${mailinfo.messageId}`)
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}
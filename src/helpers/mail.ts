import nodemailer from "nodemailer";

export const sendMail = async (payload: any) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `${process.env.SMTP_USER}`,
            to: payload?.to,
            subject: payload?.title,
            text: `Forgot password link: ${payload?.data}`
        };

        const mailRes = await transporter.sendMail(mailOptions)
        return mailRes

    } catch (error) {
        console.log('error: ', error);
    }
}
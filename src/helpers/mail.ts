import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export const sendMail = async (payload: any) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const handlebarOptions: any = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('public/templates'),
                defaultLayout: false,
            },
            viewPath: path.resolve('public/templates'),
            extName: '.handlebars',
        };

        transporter.use('compile', hbs(handlebarOptions));

        const mailOptions = {
            from: `Graphics CRM | ${process.env.SMTP_USER}`,
            to: payload?.to,
            subject: payload?.title,
            template: payload.template,
            context: {
                data: payload?.data,
            },
        };

        const mailRes = await transporter.sendMail(mailOptions);
        return mailRes;

    } catch (error) {
        console.log('error: ', error);
    }
};

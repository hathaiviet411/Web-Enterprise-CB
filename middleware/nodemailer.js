const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // const mailContent = await ejs.renderFile(__dirname + '/' + options.template, options.content);

    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: '<p>New Idea of your department has been added</p>'
    };

    // Send email
    await transporter.sendMail(mailOptions);
};

/*
Example:
sendEmail({
    "youremail@gmail.com,
    "Email subject",
    { name: "Eze" },
    "../templates/reset_password.pug"
});
*/

module.exports = sendEmail;
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: process.env.SMTP_PORT || "587",
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
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
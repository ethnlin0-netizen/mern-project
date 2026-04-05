const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:5173/verify-email/${token}?email=${email}`;
    //backend link should be replaced with frontend link when frontend is ready

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Welcome</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>This link expires in 24 hours.</p>
        `,
    });
};

module.exports = { sendVerificationEmail };
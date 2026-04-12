const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `https://groupstudyhub.xyz/verify-email/${token}?email=${email}`

    await sgMail.send({
        to: email,
        from: 'your_verified_sender@email.com',
        subject: 'Verify Your Email',
        html: `
            <h2>Welcome</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>This link expires in 1 hour.</p>
        `
    })
}

const sendResetPasswordEmail = async (email, token) => {
    const resetLink = `https://groupstudyhub.xyz/reset-password/${token}`

    await sgMail.send({
        to: email,
        from: 'your_verified_sender@email.com',
        subject: 'Reset Your Password',
        html: `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 1 hour.</p>
        `
    })
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail }
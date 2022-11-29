const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')


const sendEmail = asyncHandler(async options => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const message = {
        from: process.env.NODEMAILER_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.text  
    }

    const info = await transporter.sendMail(message, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    });
    console.log(__dirname)
})

module.exports = {
    sendEmail
}
const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

const mailOptions = {
    from: `"LegacyFrame" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
    `
};

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

module.exports = { sendEmail };

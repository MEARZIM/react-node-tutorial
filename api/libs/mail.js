const { Resend } = require('resend');


// Environment variables set up
const dotenv = require('dotenv');
dotenv.config();


const sendMail = async (email, otp) => {
    // Initialize the Resend SDK
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
        
        // Send OTP to the user's email
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'OTP for Verification',
            html: `<p>Your OTP is : <strong>${otp}</strong>!</p>`
        });
        
    } catch (error) {
        throw new Error('Error sending email');
    }
}

module.exports = sendMail;
const crypto = require('crypto');

const generateOtp = () => {
    // Never use Math.random() for OTP generation

    // Generate a 6 digit OTP
    return crypto.randomInt(100000, 999999).toString();
}

module.exports = generateOtp;
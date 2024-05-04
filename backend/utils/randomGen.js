const crypto = require('crypto');

function generateOTP() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charsLength = chars.length;
  let otp = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = crypto.randomInt(0, charsLength);
    otp += chars[randomIndex];
  }

  return otp;
}

module.exports = generateOTP;
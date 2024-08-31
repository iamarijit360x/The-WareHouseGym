  exports.otpByMail = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; color: #000000; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
            <div style="text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">OTP Verification</h1>
                <p style="margin: 4px 0; font-size: 14px; color: #888888;">Your One-Time Password (OTP)</p>
            </div>
            
            <div style="font-size: 18px; margin: 20px 0; font-weight: bold;">
                Your OTP: ${otp}
            </div>
    
            <div style="font-size: 14px; color: #666666; margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
                Please use the above OTP to complete your verification. This OTP is valid for 5 minutes only.
            </div>
        </div>
        <div style="text-align: center; font-size: 12px; color: #aaaaaa; margin-top: 20px;">
            © 2023 The WareHouseGym. All rights reserved.
        </div>
    </body>
    </html>`;
};

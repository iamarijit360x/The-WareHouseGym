exports.membershipReminderEmail = (name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Membership Renewal Reminder</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; color: #000000; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
            <div style="text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">We Miss You at Warehouse Gym!</h1>
            </div>

            <div style="font-size: 16px; color: #333333; margin: 20px 0;">
                <p>Dear ${name},</p>
                <p>We noticed that your membership with Warehouse Gym has expired. We’d love to have you back to continue your fitness journey with us!</p>
                <p>Renew your membership today and enjoy our state-of-the-art equipment, personalized training programs, and much more.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://yourwebsite.com/renew-membership" style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Renew Membership Now</a>
            </div>

            <div style="font-size: 14px; color: #666666; margin: 20px 0;">
                <p>If you have any questions or need assistance, feel free to reply to this email or contact us at support@warehousegym.com.</p>
                <p>We look forward to seeing you again!</p>
            </div>
        </div>
        <div style="text-align:center; font-size: 12px; color: #aaaaaa; margin-top: 20px;">
            © 2024 Warehouse Gym. All rights reserved.
        </div>
    </body>
    </html>`;
};

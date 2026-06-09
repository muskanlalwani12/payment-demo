const cron = require("node-cron");
const { sendMail } = require("../utils/mailer");

const startEmailJob = () => {
  // Run every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    try {
      await sendMail(
        process.env.EMAIL_RECEIVER,
        "Auto Email (15 Minute Interval)",
        "This is an automated email sent every 15 minutes."
      );

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email sending failed:", error.message);
    }
  });

  console.log("Email scheduler started");
};

module.exports = { startEmailJob };
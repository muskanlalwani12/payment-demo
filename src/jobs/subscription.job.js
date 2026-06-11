const cron = require("node-cron");
const User = require("../models/user.model");

// runs daily
const startSubscriptionJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Checking subscriptions...");

      const users = await User.find({
        subscriptionStatus: "active",
      });

      console.log(`Active users: ${users.length}`);
    } catch (error) {
      console.log("Subscription job error:", error.message);
    }
  });
};

module.exports = { startSubscriptionJob };
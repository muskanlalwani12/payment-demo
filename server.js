require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/db");
const { startEmailJob } = require("./src/jobs/email.job");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Connect DB first
    await connectDB();

    // 2. Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // 3. Start background jobs
    startEmailJob();

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
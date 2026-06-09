require("dotenv").config();

const app = require("./app");
const { startEmailJob } = require("./src/jobs/email.job");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});

startEmailJob();
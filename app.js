const express = require("express");

const paymentRoutes = require("./src/routes/payment.routes");
const stripeRoutes = require("./src/routes/stripe.routes");

const app = express();

app.use(express.json());

// Razorpay
app.use("/api/payment", paymentRoutes);

// Stripe
app.use("/api/stripe", stripeRoutes);

module.exports = app;
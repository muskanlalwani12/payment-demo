
const express = require("express");

const paymentRoutes = require("./src/routes/payment.routes");
const stripeRoutes = require("./src/routes/stripe.routes");
const authRoutes = require("./src/routes/auth.routes");
const subscriptionRoutes = require("./src/routes/subscription.routes");
const webhookRoutes = require("./src/routes/webhook.routes");

const app = express();

/*
  Stripe Webhook Route
  MUST come before express.json()
*/
app.use("/api/webhook", webhookRoutes);

/*
  Parse JSON body for all other routes
*/
app.use(express.json());

/*
  Auth Routes
*/
app.use("/api/auth", authRoutes);

/*
  Razorpay Routes
*/
app.use("/api/payment", paymentRoutes);

/*
  Stripe Payment Routes
*/
app.use("/api/stripe", stripeRoutes);

/*
  Subscription Routes
*/
app.use("/api/subscription", subscriptionRoutes);

module.exports = app;

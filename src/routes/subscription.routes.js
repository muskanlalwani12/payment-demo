const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const checkSubscription = require("../middleware/subscription.middleware");

const {
  createSubscription,
} = require("../controllers/stripe/subscription.controller");

// Free route
router.get("/free-content", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "This is free content",
  });
});

// Premium route
router.get(
  "/premium-content",
  authMiddleware,
  checkSubscription,
  (req, res) => {
    res.json({
      success: true,
      message: "This is premium content 🔥",
    });
  }
);

// Create Stripe Subscription
router.post(
  "/create",
  authMiddleware,
  createSubscription
);

module.exports = router;


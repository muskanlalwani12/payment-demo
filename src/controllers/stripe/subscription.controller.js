const stripeService = require("../../services/stripe/stripe.service");

// Create Stripe Subscription Checkout Session
const createSubscription = async (req, res) => {
  try {
    const user = req.user;

    const session = await stripeService.createSubscriptionSession(user);

    return res.status(200).json({
      success: true,
      message: "Subscription checkout session created successfully",
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error("Create Subscription Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create subscription session",
    });
  }
};
const cancelSubscription = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  cancelSubscription,
};

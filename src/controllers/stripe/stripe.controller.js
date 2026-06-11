const stripeService = require("../../services/stripe/stripe.service");

const createCheckout = async (req, res) => {
  try {
    const session = await stripeService.createCheckoutSession(50000);

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createCheckout };
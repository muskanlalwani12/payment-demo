const stripe = require("../../config/stripe");

const createSubscriptionSession = async (user) => {
  if (!user || !user.email) {
    throw new Error("User information is required");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "subscription",

      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: "Premium Subscription",
              description: "Monthly subscription plan",
            },

            unit_amount: 49900, // ₹499.00

            recurring: {
              interval: "month",
            },
          },

          quantity: 1,
        },
      ],

      success_url:
        process.env.SUCCESS_URL ||
        "http://localhost:3000/success",

      cancel_url:
        process.env.CANCEL_URL ||
        "http://localhost:3000/cancel",
    });

    return session;
  } catch (error) {
    console.error("Stripe Subscription Error:", error);

    throw new Error(
      error.message || "Failed to create subscription session"
    );
  }
};

module.exports = {
  createSubscriptionSession,
};

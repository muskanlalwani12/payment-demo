const stripe = require("../config/stripe");

const createCheckoutSession = async (amount) => {
  if (!amount || isNaN(amount)) {
    throw new Error("Invalid amount");
  }

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Test Product",
          },
          unit_amount: amount, // paise
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
};

module.exports = { createCheckoutSession };
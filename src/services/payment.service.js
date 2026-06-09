const razorpay = require("../config/razorpay");

const createOrder = async (amount) => {
  return await razorpay.orders.create({
    amount,
    currency: "INR",
  });
};

module.exports = {
  createOrder,
};
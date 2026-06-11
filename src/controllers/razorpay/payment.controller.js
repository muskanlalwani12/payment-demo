const paymentService = require("../../services/razorpay/payment.service");

const createOrder = async (req, res) => {
  try {
    const amount = req.body.amount || 50000;

    const order = await paymentService.createOrder(amount);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
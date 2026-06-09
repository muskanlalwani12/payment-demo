const paymentService = require("../services/payment.service");

const createOrder = async (req, res) => {
  try {
    const order = await paymentService.createOrder(50000);

    return res.json(order);
  } catch (error) {
    console.error("FULL ERROR:");
    console.dir(error, { depth: null });

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
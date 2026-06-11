const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/razorpay/payment.controller");

router.post(
  "/create-order",
  paymentController.createOrder
);

module.exports = router;
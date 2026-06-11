const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/stripe/stripe.controller");

router.post("/create-checkout", stripeController.createCheckout);

module.exports = router;
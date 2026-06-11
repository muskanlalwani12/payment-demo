const razorpay = require("../../config/razorpay");

/*
|--------------------------------------------------------------------------
| One-Time Payment
|--------------------------------------------------------------------------
*/
const createOrder = async (amount) => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error("Valid amount is required");
    }

    const order = await razorpay.orders.create({
      amount, // in paise
      currency: "INR",
      payment_capture: 1,
    });

    return order;

  } catch (error) {
    throw new Error(
      error.error?.description || error.message
    );
  }
};

/*
|--------------------------------------------------------------------------
| Razorpay Subscription (Auto Debit)
|--------------------------------------------------------------------------
*/
const createSubscription = async (user) => {
  try {
    const subscription =
      await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12,

        notes: {
          userId: user?._id,
          email: user?.email,
        },
      });

    return subscription;
  } catch (error) {
    throw new Error(
      error.error?.description || error.message
    );
  }
};

module.exports = {
  createOrder,
  createSubscription,
};

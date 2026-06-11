const stripe = require("../../config/stripe");
const User = require("../../models/user.model");

const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(
      "Stripe Webhook Signature Verification Failed:",
      error.message
    );

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object;

        await User.findOneAndUpdate(
          { email: session.customer_email },
          {
            subscriptionStatus: "active",
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
          }
        );

        console.log(
          `Subscription activated for ${session.customer_email}`
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        await User.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          {
            subscriptionStatus: "cancelled",
          }
        );

        console.log(
          `Subscription cancelled: ${subscription.id}`
        );

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;

        await User.findOneAndUpdate(
          { stripeCustomerId: invoice.customer },
          {
            subscriptionStatus: "expired",
          }
        );

        console.log(
          `Payment failed for customer: ${invoice.customer}`
        );

        break;
      }

      default:
        console.log(
          `Unhandled Stripe event: ${event.type}`
        );
    }

    return res.status(200).json({
      success: true,
      received: true,
    });

  } catch (error) {
    console.error(
      "Stripe Webhook Processing Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to process webhook event",
    });
  }
};

module.exports = {
  stripeWebhook,
};


const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NX5CjSJexbD8scVWi73F1IBcXMTO9FmepJQo2bF0u4cD2KEY18CBP1DCs4wJAe9GLfuocdNRveRiBKQVIf2f04z00EenetNjd"
);

// After /payments,

router.post("/intents", async (req, res) => {
  try {
    // 1.Create a paymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;

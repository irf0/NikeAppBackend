const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NX5CjSJexbD8scVWi73F1IBcXMTO9FmepJQo2bF0u4cD2KEY18CBP1DCs4wJAe9GLfuocdNRveRiBKQVIf2f04z00EenetNjd"
);

// After /payments,

router.post("/intents", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;

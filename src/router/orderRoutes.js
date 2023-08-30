const express = require("express");
const { createOrder, getOrder } = require("../database/order");
const router = express.Router();

//Creating an order
router.post("/", async (req, res) => {
  const orderData = req.body;

  //Generate a reference to the product id to make tracking easy.
  const ref = (Math.random() + 1).toString(36).substring(7);
  orderData.ref = ref;

  const newOrder = await createOrder(orderData);
  res.status(201).send({ status: "OK", data: newOrder });
  //201->means something new created
});

//Track an order by entering a tracking code (reference)
router.get("/:reference", async (req, res) => {
  try {
    const order = await getOrder(req.params.reference);

    if (!order) {
      res.status(404).send({ status: "FAILED", error: "Order Not Found!" });
      return;
    } else {
      res.status(200).send({ status: "OK", data: order });
    }
  } catch (error) {
    res.status(500).send({ status: "FAILED", error: error.message });
  }
});

module.exports = router;

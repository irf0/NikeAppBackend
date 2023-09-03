require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const productRoutes = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");
const paymentRoutes = require("./router/paymentRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("<h2>Hello world!</h2>");
});

//Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log("API is listening on port ", PORT);
});

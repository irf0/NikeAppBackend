const express = require("express");
const PORT = 3000;
const productRoutes = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");
const paymentRoutes = require("./router/paymentRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*", // Specify the allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
};
app.use(cors(corsOptions));

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

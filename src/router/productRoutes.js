//Its a good practice to split the whole backend such as Routes in chunks for future (in case the app grows big.)

const express = require("express");
const router = express.Router();
const { getAllProducts, getOneProduct } = require("../database/product");

//Define the routes

// /products-> is defined in index.js already.//

//Get all the prodcuts
router.get("/", async (req, res) => {
  const allProducts = await getAllProducts();
  console.log(allProducts);
  res.send({ status: "OK", data: allProducts });
});

//Get one product
router.get("/:productId", async (req, res) => {
  try {
    const oneProduct = await getOneProduct(req.params.productId);
    if (!oneProduct) {
      res.status(404).send({ status: "FAILED", error: "Product Not Found!" });
      return;
    } else {
      res.send({ status: "OK", data: oneProduct });
    }
  } catch (error) {
    res.send({ status: "FAILED", error: error.message });
  }
});

module.exports = router;

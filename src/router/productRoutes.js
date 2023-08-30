//Its a good practice to split the whole backend such as Routes in chunks for future (in case the app grows big.)

const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { getAllProducts, getOneProduct } = require("../database/product");

//Define the routes

// /products-> is defined in index.js already.//

//Get all the prodcuts
router.get("/", async (req, res) => {
  const allProducts = await getAllProducts();
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

//Search a product
router.post("/search", async (req, res) => {
  const query = req.query.key; // Get the search query from the request query parameters

  if (!query) {
    res.status(400).send({ status: "FAILED", error: "Missing search query" });
  }

  try {
    const searchResults = await db.products
      .find({
        name: { $regex: query, $options: "i" },
      })
      .toArray();

    //If there's no results returned by server
    if (searchResults.length === 0) {
      res.send({
        status: "OK",
        data: [],
        message: "No products found matching the search query",
      });
    } else {
      res.send({ status: "OK", data: searchResults });
    }
  } catch (error) {
    res.status(500).send({ status: "FAILED", error: error.message });
  }
});

module.exports = router;

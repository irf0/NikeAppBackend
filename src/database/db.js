//Here we will connect the DB with the project

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const database = client.db("NikeDB");
const products = database.collection("products");
const orders = database.collection("orders");

module.exports = {
  products,
  orders,
};

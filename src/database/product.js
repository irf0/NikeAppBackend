const { ObjectId } = require("mongodb");
const db = require("./db");

//Querying all the products and then putting inside an array.
const getAllProducts = async () => {
  return await db.products.find().toArray();
};

//Querying one product from the DB --> We can search it by name, id, anything but id is more preffered.
const getOneProduct = async (id) => {
  return await db.products.findOne({ _id: new ObjectId(id) });
};

module.exports = {
  getAllProducts,
  getOneProduct,
};

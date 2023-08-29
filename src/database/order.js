const db = require("./db");

//1.Create a new order.
const createOrder = async (orderDetail) => {
  const result = await db.orders.insertOne(orderDetail);
  return { ...orderDetail, _id: result.insertedId };
};

//2.Get an order (Track order)
const getOrder = async (ref) => {
  return await db.orders.findOne({ ref });
};

module.exports = {
  createOrder,
  getOrder,
};

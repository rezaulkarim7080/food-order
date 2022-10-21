const express = require("express");
const authorize = require("../middlewares/authorize");
const Order = require("../models/order");

const router = express.Router();

const newOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    return res.status(201).send("Order Pleased Succesfully !!");
  } catch (err) {
    return res.status(404).send("Sorry!  Something Went Wrong");
  }
};

const orderList = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ orderTime: -1 });
  res.send(orders);
};

router.route("/").get(authorize, orderList).post(authorize, newOrder);

module.exports = router;

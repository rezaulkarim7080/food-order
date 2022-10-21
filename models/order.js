const { Date } = require("mongoose");
const { Schema, model } = require("mongoose");

/// EXAMPLE of Schema

// const order = {
//   ingredients: [
//     { type: "salad", amount: 1 },
//     { type: "meat", amount: 2 },
//   ],
//   customer: {
//     deliveryAddress: "",
//     phone: "",
//     paymentType: "",
//   },
//   price: 230,
//   orderTime: "",
// };

const orderSchema = Schema({
  userId: Schema.Types.ObjectId,
  ingredients: [{ type: { type: String }, amount: Number }],
  customer: {
    deliveryAddress: String,
    phone: String,
    paymentType: String,
  },
  price: Number,
  orderTime: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);
module.exports.Order = Order;

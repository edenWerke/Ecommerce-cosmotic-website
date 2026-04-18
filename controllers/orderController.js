const Order = require("../models/Order");
const Cart = require("../models/Cart");

// CREATE ORDER (CHECKOUT)
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice
    });

    // clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate("items.productId");

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders
};
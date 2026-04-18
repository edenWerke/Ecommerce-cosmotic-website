const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne();

    // if no cart exists, create one
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    // check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // recalculate total
    let total = 0;

    for (let item of cart.items) {
      const prod = await Product.findById(item.productId);
      total += prod.price * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addToCart, getCart, clearCart };
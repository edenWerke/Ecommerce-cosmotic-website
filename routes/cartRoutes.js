const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart
} = require("../controllers/cartController");

// protected routes
router.post("/", auth, addToCart);
router.put("/:productId", auth, updateCartItem);
router.delete("/:productId", auth, removeFromCart);
router.get("/", auth, getCart);

module.exports = router;
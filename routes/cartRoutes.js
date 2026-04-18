const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addToCart,
  getCart
} = require("../controllers/cartController");

// protected routes
router.post("/", auth, addToCart);
router.get("/", auth, getCart);

module.exports = router;
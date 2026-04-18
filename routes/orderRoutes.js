const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createOrder,
  getUserOrders
} = require("../controllers/orderController");

// checkout (create order)
router.post("/", auth, createOrder);

// get user orders
router.get("/", auth, getUserOrders);

module.exports = router;
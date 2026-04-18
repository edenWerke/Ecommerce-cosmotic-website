const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = { createProduct, getProducts };

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../models/middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Fetched products:", products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, price, description, images } = req.body;

    if (!title || !price || !description || !images || !Array.isArray(images)) {
      return res.status(400).json({ error: "Missing required fields or invalid format." });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      images,
      inStock: true,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("POST /api/products error:", error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  images: [String],
  });

module.exports = mongoose.model('Product', productSchema);

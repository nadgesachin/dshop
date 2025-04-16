// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
  features: [String],
  specifications: Object,
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  createdAt: String,
});

const Product = mongoose.model("Prod", productSchema);

module.exports = Product;

const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // base64 or image URL
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);

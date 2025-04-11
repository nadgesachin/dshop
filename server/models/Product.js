const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['CCTV Cameras', 'Computer CPUs', 'Monitors and parts', 'Speakers', 'Printers']
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    public_id: String,
    url: String
  }],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  features: [String],
  specifications: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema); 
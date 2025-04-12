const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  product: {
    type: String,
    default: ''
  },
  comment: {
    type: String,
    default: ''
  },
  photos: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema); 
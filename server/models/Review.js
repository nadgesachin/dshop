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
    type: String,
    default: ''
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
  }],
  profilePhoto: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema); 
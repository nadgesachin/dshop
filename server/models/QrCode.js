const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  svg: {
    type: String,
    required: true,
  },
  count:{
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QrCode', qrCodeSchema); 
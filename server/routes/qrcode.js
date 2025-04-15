
const express = require('express');
const router = express.Router();
const QRCodeModel = require('../models/QrCode');

// GET all QR codes
router.get('/all', async (req, res) => {
  try {
    const codes = await QRCodeModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: codes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching QR codes', error: err.message });
  }
});

// POST create new QR code (max 5)
router.post('/save', async (req, res) => {
  try {
    const totalCount = await QRCodeModel.countDocuments();
    if (totalCount >= 5) {
      return res.status(400).json({ success: false, message: 'Limit reached: Only 5 QR codes allowed' });
    }

    const { svg, count } = req.body;

    if (!svg || typeof count !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const newQRCode = new QRCodeModel({ svg, count });
    await newQRCode.save();

    res.status(200).json({ success: true, message: 'QR code saved successfully', data: newQRCode });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving QR code', error: err.message });
  }
});

module.exports = router;

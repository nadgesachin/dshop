const express = require('express');
const router = express.Router();
const { auth }= require('../middleware/authMiddleware');

// Shop information schema
const shopInfo = {
  name: 'CSC CENTER SHIV MOBILE',
  description: 'Your trusted destination for mobile and electronics needs',
  contact: {
    phone: '9737485262',
    email: 'shivmobile780@gmail.com',
    address: 'KARCHOND khadkipada DNH&DD Silvassa-396230'
  },
  workingHours: {
    monday: '10:00 AM - 8:00 PM',
    tuesday: '10:00 AM - 8:00 PM',
    wednesday: '10:00 AM - 8:00 PM',
    thursday: '10:00 AM - 8:00 PM',
    friday: '10:00 AM - 8:00 PM',
    saturday: '10:00 AM - 8:00 PM',
    sunday: '11:00 AM - 6:00 PM'
  },
  location: {
    lat: 20.2736,
    lng: 73.0192,
    googleMapsUrl: 'https://maps.app.goo.gl/B7YkiDgia7Kiqvxk9'
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/shivmobile',
    instagram: 'https://www.instagram.com/shivmobile',
    whatsapp: 'https://wa.me/919737485262'
  }
};

// Get shop information
router.get('/', (req, res) => {
  res.json({ success: true, shop: shopInfo });
});

// Update shop information (Admin only)
router.put('/', auth, (req, res) => {
  // TODO: Implement admin authentication
  // TODO: Implement shop info update logic
  res.status(501).json({ 
    success: false, 
    message: 'Not implemented yet' 
  });
});

// Get shop location
router.get('/location', (req, res) => {
  res.json(shopInfo.location);
});

// Update shop location (Admin only)
router.put('/location', auth, (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    shopInfo.location = { lat, lng };
    res.json({ message: 'Location updated successfully', data: shopInfo.location });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
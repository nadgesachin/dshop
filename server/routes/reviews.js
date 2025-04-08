const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const { uploadToCloudinary } = require('../utils/cloudinary');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get approved reviews
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    res.status(500).json({ error: 'Failed to fetch approved reviews' });
  }
});

// Submit a new review
router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    console.log('Received review submission:', req.body);
    console.log('Files:', req.files);

    // Validate required fields
    const { name, email, rating, product, comment } = req.body;
    const missingFields = [];
    
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!rating) missingFields.push('rating');
    if (!product) missingFields.push('product');
    if (!comment) missingFields.push('comment');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        fields: missingFields 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate rating
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Handle photo uploads
    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path);
          photoUrls.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading photo:', error);
        }
      }
    }

    // Create new review
    const review = new Review({
      name,
      email,
      rating: ratingNum,
      product,
      comment,
      photos: photoUrls,
      status: 'approved' // Auto-approve reviews
    });

    await review.save();

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'shivmobile780@gmail.com',
        subject: 'New Review Received',
        html: `
          <h2>New Review Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Rating:</strong> ${rating}/5</p>
          <p><strong>Comment:</strong> ${comment}</p>
          ${photoUrls.length > 0 ? `<p><strong>Photos:</strong> ${photoUrls.length} attached</p>` : ''}
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the review submission if email fails
    }

    res.status(201).json({ 
      success: true,
      message: 'Review submitted successfully',
      review 
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ 
      error: 'Failed to submit review',
      details: error.message 
    });
  }
});

// Update review status (Admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    res.json({ message: 'Review status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching reviews',
      error: error.message 
    });
  }
});

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId,
      status: 'approved'
    }).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching product reviews',
      error: error.message 
    });
  }
});

module.exports = router; 
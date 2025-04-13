const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');
// Get all reviews
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Review.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const reviews = await Review.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ reviews, total, page, limit, totalPages });
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
router.post('/', async (req, res) => {
  try {

    // Validate required fields
    const { name, email, rating, product, comment, profilePhoto, photos } = req.body;
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

    
    // Create new review
    const review = new Review({
      name:req.body.name,
      email:req.body.email,
      rating:req.body.rating,
      product:req.body.product,
      comment:req.body.comment,
      photos: req.body.photos,
      profilePhoto: req.body.profilePhoto
    });
    await review.save();
      const html = `
        <div style="
          font-family: 'Segoe UI', sans-serif;
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #fff7ed, #fef3c7);
          padding: 30px 20px;
          border-radius: 15px;
        ">
          <div style="
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.06);
            padding: 32px;
          ">
            <!-- Header with logo -->
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://i.ibb.co/yYc6FWc/logo.png" alt="Shiv Mobile Logo" style="width: 64px; height: 64px; border-radius: 50%; background: white; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
              <h1 style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #ea580c;">Shiv Mobile</h1>
              <p style="font-size: 14px; color: #6b7280;">You've received a new product review</p>
            </div>

            <!-- Review Summary -->
            <div style="margin-top: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Name:</strong>
                <span style="color: #374151;">${name}</span>
              </div>

              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Email:</strong>
                <span style="color: #374151;">${email}</span>
              </div>

              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Product:</strong>
                <span style="color: #374151;">${product}</span>
              </div>

              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Rating:</strong>
                <span style="color: #fbbf24; font-weight: bold;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
              </div>

              <div style="margin: 20px 0; padding: 16px; background-color: #fff7ed; border-left: 4px solid #ea580c; border-radius: 8px;">
                <strong style="color: #c2410c; display: block; margin-bottom: 8px;">Comment:</strong>
                <p style="color: #374151; font-size: 15px; line-height: 1.5; margin: 0;">${comment}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'nadgesachin644@gmail.com',
        subject: 'New Review Received',
        html: html
      };
      if(process.env.NODE_ENV === 'production'){
        await sendEmail(mailOptions);
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
    if (review.profilePhoto) {
      await deleteFromCloudinary(review.profilePhoto);
    }
    if (review.photos) {
      for (const photo of review.photos) {
        await deleteFromCloudinary(photo);
      }
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
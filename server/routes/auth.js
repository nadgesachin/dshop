const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const upload = require('../utils/multer'); 
const { uploadToCloudinary } = require('../utils/cloudinary');
const sendEmail = require('../utils/sendEmail');
const { authUser } = require('../middleware/authMiddleware');
// Register new user
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, password, dob, signup } = req.body;
    let photoUrl = '';

    // Validation
    if (!name || !email ) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Upload photo if provided
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.path);
        photoUrl = uploadResult.secure_url;
      } catch (err) {
        console.error('Error uploading photo to Cloudinary:', err);
      }
    }

    if(!password){
    //create unique password
    const uniquePassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    req.body.password = uniquePassword;
    if(process.env.NODE_ENV === 'production'){
    sendEmail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your Shiv Mobile Account Password',
      html: `Your Shiv Mobile account password is: ${uniquePassword}`,
      });
      }
    }
    // Create new user
    user = new User({
      name,
      email,
      password: password,
      photo: photoUrl,
      dob,
      role: 'user',
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: 'nadgesachin644@gmail.com',
      subject: 'New User Registration - Shiv Mobile',
      html: `
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
            <!-- Logo and heading -->
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://i.ibb.co/yYc6FWc/logo.png" alt="Shiv Mobile Logo" style="width: 64px; height: 64px; border-radius: 50%; background: white; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
              <h1 style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #ea580c;">New User Registration</h1>
              <p style="font-size: 14px; color: #6b7280;">Someone just signed up on Shiv Mobile Portal</p>
            </div>
  
            <div style="margin-top: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Name:</strong>
                <span style="color: #374151;">${user.name}</span>
              </div>
  
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">Email:</strong>
                <span style="color: #374151;">${user.email}</span>
              </div>
  
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <strong style="min-width: 100px; color: #78350f;">DOB:</strong>
                <span style="color: #374151;">${user.dob || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      `
    };
    if(process.env.NODE_ENV === 'production'){
      await sendEmail(mailOptions);
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'shhh_very_secret',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          token,
        });
      }
    );

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if(email === 'admin' && password === 'admin00'){
      const payload = {
        user: {
          id: 'admin'
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) throw err;
          res.json({ success: true, token });
        }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in',
      error: error.message 
    });
  }
});

// Get current user
router.get('/me', authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user',
      error: error.message 
    });
  }
});

module.exports = router; 
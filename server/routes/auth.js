const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const upload = require('../utils/multer');
const { uploadToCloudinary } = require('../utils/cloudinary');
const sendEmail = require('../utils/sendEmail');
const { auth } = require('../middleware/authMiddleware');
const { getUserEmail, getAdminEmail } = require('../utils/emailTemplates');
// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dob, isAdmin, role, photo} = req.body;
    // Validation
    if (!name || !email) {
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

    if (isAdmin && user.role !== 'admin' && role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'User does not have access',
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

    if (!password) {
      //create unique password
      const uniquePassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      req.body.password = uniquePassword;
      if (process.env.NODE_ENV === 'production') {
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
      photo: photo,
      dob,
      role: role,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { _id: user._id, role: user.role } };

    const userEmail = getUserEmail(user);
    const adminEmail = getAdminEmail(user);

    if (process.env.NODE_ENV === 'production') {
      await sendEmail(userEmail);
      await sendEmail(adminEmail);
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

router.get('/users', auth, async (req, res) => {
  try {
    // Check if user already exists
    let users = await User.find({});

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      users: users,
    });

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

    // if (email === 'admin' && password === 'admin00') {
    //   const payload = {
    //     user: {
    //       _id: 'admin'
    //     }
    //   };

    //   jwt.sign(
    //     payload,
    //     process.env.JWT_SECRET,
    //     { expiresIn: '1d' },
    //     (err, token) => {
    //       if (err) throw err;
    //       res.json({ success: true, token });
    //     }
    //   );
    // }

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
        _id: user._id,
        role: user.role,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token, role: user.role });
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

router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: "Fetched Successfully UserData",
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        dob: user.dob,
        profilePhoto: user.photo
      }
    });
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
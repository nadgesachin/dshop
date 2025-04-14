const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require("mongoose");
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const isAdmin = req?.params?.isAdmin;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded);
    const user = await User.findById(new mongoose.Types.ObjectId(decoded.user._id));
    if (!user || (isAdmin && user.role !== 'admin')) {
      return res.status(401).json({ message: 'Invalid authentication' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error: ", error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = { auth }; 
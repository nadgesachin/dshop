const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = require('../utils/multer');
const { uploadToCloudinary } = require('../utils/cloudinary');

//----------------- ROUTES ------------------- //

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error('GET /products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error(`GET /products/${req.params.id}:`, error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST create product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, category, price, stock, features, specifications } = req.body;

    // Check required fields
    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate category
    const allowedCategories = ['CCTV Cameras', 'Computer CPUs', 'Monitors and parts', 'Speakers', 'Printers'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: `Invalid category. Allowed: ${allowedCategories.join(', ')}` });
    }

    // Upload images and build image object array
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path);
          images.push({
            public_id: result.public_id,
            url: result.secure_url
          });
        } catch (error) {
          console.error('Cloudinary upload error:', error);
        }
      }
    }

    // Parse features and specifications
    const parsedFeatures = features ? features.split(',').map(f => f.trim()) : [];
    const parsedSpecifications = specifications ? String(specifications) : '';

    // Create product
    const product = new Product({
      name,
      description,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      features: parsedFeatures,
      specifications: parsedSpecifications,
      images
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, product: savedProduct });

  } catch (error) {
    console.error('POST /products:', error);
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
});


router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, category, price, stock, features, specifications } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Validate category if provided
    const allowedCategories = [
      'CCTV Cameras',
      'Computer CPUs',
      'Monitors and parts',
      'Speakers',
      'Printers'
    ];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed: ${allowedCategories.join(', ')}`
      });
    }

    // Parse specifications safely
    let parsedSpecifications = product.specifications;
    if (specifications) {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Specifications must be valid JSON',
          error: err.message
        });
      }
    }

    // Upload and merge new images if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path);
        product.images.push({
          public_id: result.public_id,
          url: result.secure_url
        });
      }
    }

    // Update fields conditionally
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ? parseFloat(price) : product.price;
    product.stock = stock ? parseInt(stock) : product.stock;
    product.features = features ? features.split(',').map(f => f.trim()) : product.features;
    product.specifications = parsedSpecifications;

    const updatedProduct = await product.save();

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(`PUT /products/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// DELETE product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    // Remove Cloudinary images
    for (const img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`DELETE /products/${req.params.id}:`, error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
});

module.exports = router;

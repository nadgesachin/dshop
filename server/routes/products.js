const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Prod = require('../models/ProductTest');
const { auth }= require('../middleware/authMiddleware');
const multer = require('multer'); 
const upload = require('../utils/multer');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

//----------------- ROUTES ------------------- //

// GET all products
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;         // default to page 1
    const limit = parseInt(req.query.limit) || 50;      // default to 50
    const skip = (page - 1) * limit;

    const { category, search } = req.query;

    // Build filter conditions dynamically
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Add search functionality
    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    const [products, total] = await Promise.all([
      Prod.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Prod.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: err.message
    });
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
    // const allowedCategories = ['CCTV Cameras', 'Computer CPUs', 'Monitors and parts', 'Speakers', 'Printers'];
    // if (!allowedCategories.includes(category)) {
    //   return res.status(400).json({ success: false, message: `Invalid category. Allowed: ${allowedCategories.join(', ')}` });
    // }

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
          return res.status(500).json({ success: false, message: 'Image upload failed', error: error.message });
        }
      }  
    }

    // Parse features and specifications
    const parsedFeatures = features ? features.split(',').map(f => f.trim()) : [];
    const parsedSpecifications = specifications ? String(specifications) : '';

    // Create product
    const product = new Prod({
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

    const product = await Prod.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Parse specifications
    let parsedSpecifications = specifications ? String(specifications) : '';

    // Handle image update
    if (req.files && req.files.length > 0) {
      // Delete old images
      for (const image of product.images) {
        if (image.public_id) {
          await deleteFromCloudinary(image.public_id);
        }
      }

      // Upload new images
      const newImages = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path);
        newImages.push({
          public_id: result.public_id,
          url: result.secure_url
        });
      }
      product.images = newImages;
    }

    // Update fields
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
router.delete('/:id', async (req, res) => {
  try {
    const product = await Prod.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    // Remove Cloudinary images
    for (const img of product.images) {
      if (img.public_id) {
        await deleteFromCloudinary(img.public_id);
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

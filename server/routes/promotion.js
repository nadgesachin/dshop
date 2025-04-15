// routes/promotion.js
const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion'); // your Mongoose model
const upload = require('../utils/multer');

// POST create promotion
router.get('/getall', async (req, res) => {
    try {

        const promotions = await Promotion.find({});
        res.status(200).json({
            success: true,
            message: 'Promotion fetch successfully',
            data: promotions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add promotion',
            error: error.message
        });
    }
});
// POST create promotion
router.post('/save', async (req, res) => {
    try {
        const { title, description, image } = req.body;

        const newPromo = new Promotion({
            title,
            description,
            image,
        });

        await newPromo.save();
        res.status(200).json({ message: 'Promotion added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add promotion', error: error.message });
    }
});

// PUT update promotion
router.put('/update/:id', upload.single('file'), async (req, res) => {
    try {
        const { title, description, image } = req.body;

        await Promotion.findByIdAndUpdate(req.params.id, {
            title,
            description,
            image,
        });

        res.status(200).json({ message: 'Promotion updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update promotion', error: error.message });
    }
});

// DELETE promotion
router.delete('/delete/:id', async (req, res) => {
    try {
        await Promotion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete promotion', error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Subscribe = require('../models/Subscribe')
// Get shop information
router.get('/allsubscribers', async (req, res) => {
    try{
        const allSubscribers = await Subscribe.find({});
        res.status(200).json({
            success: true,
            message: 'Fetched Subscribers Successfully',
            data: allSubscribers
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: 'Error during fetching subcribers.'
        });
    }
});

router.post('/save', async (req, res) => {
    try {
        const { email } = req.body;
        const subcriber = await Subscribe.findOne({ email });
        if(subcriber){
            res.status(501).json({
                success: false,
                message: 'You are already subscribed'
            });
        }
        const newSubscribe = new Subscribe(
            {
                email: email
            }
        )
        await newSubscribe.save();
        res.status(200).json({
            success: true,
            message: 'Subscribed Successfully'
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            error: error.message,
            message: 'Error during subscrib'
        });
    }
});

module.exports = router; 
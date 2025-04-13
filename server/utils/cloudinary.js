const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'reviews',
      resource_type: 'auto'
    });

    // Delete the local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Image with public_id "${publicId}" deleted:`, result);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}


module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
}; 
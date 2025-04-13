const { uploadToCloudinary } = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = require('express').Router();

//route for upload image to cloudinary
router.post('/image', upload.fields([{ name: 'profilePhoto' }, { name: 'photos' }]), async (req, res) => {
  try {
    const { profilePhoto, photos } = req.files; // Use req.files to access uploaded files

    if (profilePhoto) {
      // Upload profile photo
      const profilePhotoResult = await uploadToCloudinary(profilePhoto[0].path);
      const profilePhotoUrl = profilePhotoResult.url;
      return res.status(200).json({ profilePhotoUrl });
    }
    if (photos) {
      // Upload review photos
      const photosResults = await Promise.all(photos.map(photo => uploadToCloudinary(photo.path)));
      const photosUrls = photosResults.map(result => result.url);
      return res.status(200).json({ photosUrls });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

module.exports = router;

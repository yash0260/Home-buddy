const express = require('express');
const router = express.Router();
const { uploadImage, uploadMultipleImages, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/single', protect, upload.single('image'), uploadImage);

router.post('/multiple', protect, upload.array('images', 5), uploadMultipleImages);

router.delete('/', protect, deleteImage);

module.exports = router;

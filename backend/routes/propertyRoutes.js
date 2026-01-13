const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
} = require('../controllers/propertyController');
const { protect, landlordOnly } = require('../middleware/auth');

router.route('/').get(getProperties).post(protect, landlordOnly, createProperty);
router.get('/featured', getFeaturedProperties);
router.route('/:id').get(getPropertyById).put(protect, landlordOnly, updateProperty).delete(protect, landlordOnly, deleteProperty);

module.exports = router;

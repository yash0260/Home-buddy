const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'House & Villa', 'Office & Studio', 'Commercial', 'Homes & Villas', 'Condos'],
    required: true,
  },
  category: {
    type: String,
    enum: ['For Rent', 'For Sale'],
    default: 'For Rent',
  },
  bedrooms: {
    type: Number,
    default: 1,
  },
  bathrooms: {
    type: Number,
    default: 1,
  },
  area: {
    type: Number,
  },
  images: [{
    type: String,
  }],
  amenities: [{
    type: String,
  }],
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'unavailable'],
    default: 'available',
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Property', propertySchema);

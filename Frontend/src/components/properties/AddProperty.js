import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './property.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: 'Apartment',
    category: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    amenities: '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, description, price, location, propertyType, category, bedrooms, bathrooms, area, amenities } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setError('You can upload maximum 5 images');
      return;
    }

    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title || !description || !price || !location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one image');
      setLoading(false);
      return;
    }

    try {
      setUploadingImages(true);
      const imageUrls = [];

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      for (const image of images) {
        const imageData = new FormData();
        imageData.append('image', image);

        const { data } = await axios.post(`${API_URL}/api/upload/single`, imageData, config);
        imageUrls.push(data.url);
      }

      setUploadingImages(false);

      const amenitiesArray = amenities.split(',').map(item => item.trim());

      const propertyData = {
        title,
        description,
        price: Number(price),
        location,
        propertyType,
        category,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        amenities: amenitiesArray,
        images: imageUrls,
      };

      const propertyConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${API_URL}/api/properties`, propertyData, propertyConfig);

      alert('Property added successfully!');
      history.push('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add property');
      setUploadingImages(false);
    }
    setLoading(false);
  };

  if (!user || user.role !== 'landlord') {
    return (
      <div className='auth-container'>
        <div className='auth-box'>
          <h2>Access Denied</h2>
          <p>Only landlords can add properties. Please login as a landlord.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper property-form'>
        <div className='auth-box'>
          <h2>Add New Property</h2>
          <p className='auth-subtitle'>List your property for rent or sale</p>

          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='images'>Property Images * (Max 5)</label>
              <input
                type='file'
                id='images'
                accept='image/*'
                multiple
                onChange={handleImageChange}
                style={{padding: '10px'}}
              />
              {imagePreviews.length > 0 && (
                <div className='image-previews'>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className='image-preview-item'>
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button type='button' onClick={() => removeImage(index)} className='remove-image'>
                        <i className='fa fa-times'></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='title'>Property Title *</label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='e.g., Beautiful 2BHK Apartment'
                value={title}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description *</label>
              <textarea
                id='description'
                name='description'
                placeholder='Describe your property...'
                value={description}
                onChange={handleChange}
                rows='4'
                required
              />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='price'>Price (₹) *</label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Monthly rent or sale price'
                  value={price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='area'>Area (sq ft)</label>
                <input
                  type='number'
                  id='area'
                  name='area'
                  placeholder='Property area'
                  value={area}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='location'>Location *</label>
              <input
                type='text'
                id='location'
                name='location'
                placeholder='e.g., Sector-51, Gurgaon'
                value={location}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='propertyType'>Property Type</label>
                <select id='propertyType' name='propertyType' value={propertyType} onChange={handleChange}>
                  <option value='Apartment'>Apartment</option>
                  <option value='House & Villa'>House & Villa</option>
                  <option value='Office & Studio'>Office & Studio</option>
                  <option value='Commercial'>Commercial</option>
                  <option value='Homes & Villas'>Homes & Villas</option>
                  <option value='Condos'>Condos</option>
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select id='category' name='category' value={category} onChange={handleChange}>
                  <option value='For Rent'>For Rent</option>
                  <option value='For Sale'>For Sale</option>
                </select>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='bedrooms'>Bedrooms</label>
                <input
                  type='number'
                  id='bedrooms'
                  name='bedrooms'
                  value={bedrooms}
                  onChange={handleChange}
                  min='1'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='bathrooms'>Bathrooms</label>
                <input
                  type='number'
                  id='bathrooms'
                  name='bathrooms'
                  value={bathrooms}
                  onChange={handleChange}
                  min='1'
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='amenities'>Amenities (comma separated)</label>
              <input
                type='text'
                id='amenities'
                name='amenities'
                placeholder='e.g., Parking, Gym, Swimming Pool'
                value={amenities}
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='btn btn-primary' disabled={loading || uploadingImages}>
              {uploadingImages ? 'Uploading Images...' : loading ? 'Adding Property...' : 'Add Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

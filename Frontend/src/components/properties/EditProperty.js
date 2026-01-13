import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './property.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EditProperty = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();

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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const { title, description, price, location, propertyType, category, bedrooms, bathrooms, area, amenities } = formData;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/properties/${id}`);
        
        if (data.landlord._id !== user._id) {
          alert('You are not authorized to edit this property');
          history.push('/');
          return;
        }

        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          propertyType: data.propertyType,
          category: data.category,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area || '',
          amenities: data.amenities ? data.amenities.join(', ') : '',
        });
        setFetchLoading(false);
      } catch (error) {
        setError('Failed to load property');
        setFetchLoading(false);
      }
    };

    if (user) {
      fetchProperty();
    }
  }, [id, user, history]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    try {
      const amenitiesArray = amenities ? amenities.split(',').map(item => item.trim()) : [];

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
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${API_URL}/api/properties/${id}`, propertyData, config);

      alert('Property updated successfully!');
      history.push(`/property/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update property');
    }
    setLoading(false);
  };

  if (!user || user.role !== 'landlord') {
    return (
      <div className='auth-container'>
        <div className='auth-box'>
          <h2>Access Denied</h2>
          <p>Only landlords can edit properties.</p>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className='auth-container'>
        <div className='auth-box'>
          <p style={{textAlign: 'center', padding: '40px'}}>Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper property-form'>
        <div className='auth-box'>
          <button className='back-btn' onClick={() => history.goBack()} style={{marginBottom: '20px'}}>
            <i className='fa fa-arrow-left'></i> Back
          </button>

          <h2>Edit Property</h2>
          <p className='auth-subtitle'>Update your property details</p>

          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading ? 'Updating Property...' : 'Update Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;

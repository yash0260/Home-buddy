import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './property.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

// eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/properties/${id}`);
      setProperty(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/api/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Property deleted successfully!');
        history.push('/');
      } catch (error) {
        alert('Failed to delete property');
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return <div className='loading'>Loading property details...</div>;
  }

  if (!property) {
    return <div className='error-message'>Property not found</div>;
  }

  const isOwner = user && property.landlord && (
    user.id === property.landlord._id || 
    user._id === property.landlord._id
  );

  return (
    <div className='property-detail-page'>
      <button className='back-btn' onClick={() => history.goBack()}>
        <i className='fa fa-arrow-left'></i> Back
      </button>

      <div className='property-detail-wrapper'>
        <div className='property-image-section'>
          <div className='image-slider'>
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className='main-property-image'
            />

            {property.images.length > 1 && (
              <>
                <button className='nav-arrow prev-arrow' onClick={prevImage}>
                  <i className='fa fa-chevron-left'></i>
                </button>
                <button className='nav-arrow next-arrow' onClick={nextImage}>
                  <i className='fa fa-chevron-right'></i>
                </button>
                
                <div className='img-counter'>
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}

            <span className='category-badge'>{property.category}</span>
          </div>

          {property.images.length > 1 && (
            <div className='thumbnails-row'>
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumb-img ${index === currentImageIndex ? 'active-thumb' : ''}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className='property-details-section'>
          <h1 className='detail-title'>{property.title}</h1>
          <p className='detail-location'>
            <i className='fa fa-map-marker-alt'></i> {property.location}
          </p>
          <p className='detail-price'>
            ₹{property.price.toLocaleString()}
            <span>/month</span>
          </p>

          <div className='features-grid'>
            <div className='feature-box'>
              <i className='fa fa-bed'></i>
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className='feature-box'>
              <i className='fa fa-bath'></i>
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className='feature-box'>
              <i className='fa fa-home'></i>
              <span>{property.propertyType}</span>
            </div>
            {property.area && (
              <div className='feature-box'>
                <i className='fa fa-expand'></i>
                <span>{property.area} sq ft</span>
              </div>
            )}
          </div>

          <div className='detail-section'>
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className='detail-section'>
              <h2>Amenities</h2>
              <ul className='amenities-grid'>
                {property.amenities.map((amenity, index) => (
                  <li key={index}>
                    <i className='fa fa-check'></i> {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='detail-section'>
            <h2>Contact Landlord</h2>
            <div className='landlord-card'>
              <p className='landlord-name'>{property.landlord?.username || 'landlord'}</p>
              {property.landlord?.email && (
                <p className='landlord-contact'>
                  <i className='fa fa-envelope'></i> {property.landlord.email}
                </p>
              )}
              {property.landlord?.phone && (
                <p className='landlord-contact'>
                  <i className='fa fa-phone'></i> {property.landlord.phone}
                </p>
              )}

              <div className='contact-btns'>
                <a href={`mailto:${property.landlord?.email}`} className='btn btn-email'>
                  <i className='fa fa-envelope'></i> Send Email
                </a>
                <a href={`tel:${property.landlord?.phone}`} className='btn btn-call'>
                  <i className='fa fa-phone'></i> Call Now
                </a>
              </div>
            </div>
          </div>

          {isOwner && (
            <div className='owner-actions'>
              <button 
                className='btn btn-edit' 
                onClick={() => history.push(`/edit-property/${id}`)}
              >
                <i className='fa fa-edit'></i> Edit Property
              </button>
              <button className='btn btn-delete' onClick={handleDelete}>
                <i className='fa fa-trash'></i> Delete Property
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

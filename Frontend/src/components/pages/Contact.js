import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/contact`, formData);
      
      setSuccess(data.message);
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className='contact-page'>
      <div className='contact-banner'>
        <div className='banner-content'>
          <p className='banner-subtitle'>Contact Us</p>
          <h1>Get Helps & Friendly Support</h1>
        </div>
      </div>

      <div className='contact-container'>
        <div className='contact-form-wrapper'>
          <h2>Fillup The Form</h2>
          
          {success && <div className='success-message'>{success}</div>}
          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='form-row'>
              <div className='form-group'>
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <input
                type='text'
                name='subject'
                placeholder='Subject'
                value={subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <textarea
                name='message'
                placeholder='Your Message'
                rows='6'
                value={message}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className='btn-submit' disabled={loading}>
              {loading ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

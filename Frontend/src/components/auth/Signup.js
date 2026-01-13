import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const history = useHistory();

  const { name, email, password, confirmPassword, phone, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !phone) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password, phone, role);

    if (result.success) {
      history.push('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <div className='auth-box'>
          <h2>Create Account</h2>
          <p className='auth-subtitle'>Join HomeBuddy today!</p>

          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your full name'
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='Enter your phone number'
                value={phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='role'>I am a</label>
              <select id='role' name='role' value={role} onChange={handleChange}>
                <option value='user'>Tenant (Looking for property)</option>
                <option value='landlord'>Landlord (Have property to rent)</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Create a password'
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className='auth-footer'>
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

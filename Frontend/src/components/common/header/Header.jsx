import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <header className='header'>
      <div className='header-container'>
        {/* Logo */}
        <Link to='/' className='header-logo'>
          <div className='logo-icon'>
            <i className='fa fa-home'></i>
          </div>
          <span className='logo-text'>HomeBuddy</span>
        </Link>

        {/* Navigation */}
        <nav className='header-nav'>
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/about' className='nav-link'>About</Link>
          <Link to='/contact' className='nav-link'>Contact</Link>
        </nav>

        {/* User Actions */}
        <div className='header-user'>
          {user ? (
            <>
              <span className='welcome-text'>
                Welcome, {user.username || user.name || 'User'}
              </span>
              {user.role === 'landlord' && (
                <Link to='/add-property' className='btn btn-add-property'>
                  <i className='fa fa-plus'></i> Add Property
                </Link>
              )}
              <button onClick={handleLogout} className='btn btn-logout'>
                <i className='fa fa-sign-out-alt'></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='btn btn-login'>Login</Link>
              <Link to='/signup' className='btn btn-signup'>Register</Link>
             </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

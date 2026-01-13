import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <i className="fas fa-home"></i>
              <span>HomeBuddy</span>
            </div>
            <p className="footer-tagline">
              Find your perfect home with ease. Trusted by thousands across India.
            </p>
            
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/add-property">List Property</Link></li>
              <li><Link to="/search">Search Properties</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Top Cities</h4>
            <ul className="static-list">
              <li>Mumbai</li>
              <li>Delhi</li>
              <li>Bangalore</li>
              <li>Pune</li>
              <li>Kota</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Property Types</h4>
            <ul className="static-list">
              <li>Apartments</li>
              <li>Villas</li>
              <li>PG/Hostel</li>
              <li>Houses</li>
            </ul>
            
            <div className="footer-contact">
              <p>
                <i className="fas fa-phone"></i>
                <span>+91 98765 43210</span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>info@homebuddy.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 HomeBuddy. Designed by YK. All rights reserved.</p>
          <div className="footer-badges">
            <span>
              <i className="fas fa-shield-alt"></i> Secure
            </span>
            <span>
              <i className="fas fa-check-circle"></i> Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

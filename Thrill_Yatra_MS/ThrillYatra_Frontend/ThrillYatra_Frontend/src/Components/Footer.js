import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="thrill-footer">
      <div className="thrill-footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h3>ThrillYatra</h3>
          <p>
            Discover unforgettable adventures across breathtaking destinations.
            ThrillYatra makes your journey exciting, safe, and hassle-free.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Adventures</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p><FaMapMarkerAlt /> Pune, Maharashtra</p>
          <p><FaEnvelope /> support@thrillyatra.com</p>
          <p><FaPhoneAlt /> +91 9876543210</p>
        </div>

      </div>

      {/* Social + Copyright */}
      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaTwitter /></a>
        </div>

        <p>© 2025 ThrillYatra. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

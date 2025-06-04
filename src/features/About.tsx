import React from 'react';
import '../../src/features/styles/AboutPage.css' // Import external stylesheet
import Navbar from './components/Navbar';
// import Header from './components/Header';


const AboutPage: React.FC = () => {
  return (
    <>
    <div>
       <Navbar/>
    </div>
    <div className="about-container">
      
      <h1 className="main-heading">About ShopEase Mall</h1>

      <h2 className="sub-heading">Welcome to <strong>ShopEase Mall</strong></h2>

      <p className="description">
        At <span className="highlight">ShopEase Mall</span>, we believe shopping should be simple, fun, and accessible to everyone.
        We bring together a curated collection of stylish, high-quality products for men, women, and children—all in one place.
      </p>

      <h3 className="section-heading">Our Mission</h3>
      <p className="description">
        Our mission is to offer a seamless online shopping experience that saves you time, delivers great value, and inspires confidence.
        From fashion to beauty to essentials, we’ve got it all covered.
      </p>

      <h3 className="section-heading">Why Choose Us?</h3>
      <ul className="features-list">
        <li>✨ Hand-picked, quality products</li>
        <li>🚚 Fast and reliable shipping</li>
        <li>💳 Secure payment options</li>
        <li>💬 Friendly customer support</li>
      </ul>

      <footer className="footer">© 2025 ShopEase Mall. All rights reserved.</footer>
    </div>
    </>
  );
};

export default AboutPage;

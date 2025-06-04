
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="order-navbar-wrapper">
      <nav className="order-navbar">
        <div className="nav-logo">
          <Link to="/">ShopEase</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/children">Children</Link></li>
          <li><Link to="/beauty">Beauty</Link></li>
          <li><Link to="/order">Order History</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../features/styles/Header.css'
// import { useSearch } from '../../SearchContext';

const Header: React.FC = () => {
//   const { searchTerm, setSearchTerm } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => setIsDropdownOpen(prev => !prev);
  const toggleNav = (): void => setIsNavOpen(prev => !prev);

  return (
    <header className="headerSection">
      <div className="left">
        <h2 className="title">
          <Link to="/" className="homeLink">ShopEase Mall</Link>
        </h2>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={`center ${isNavOpen ? 'nav-active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsNavOpen(false)}>About</Link></li>

          <li className="dropdown">
            <span className="dropbtn" onClick={toggleDropdown}>Products ▾</span>
            <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <li><Link to="/women" onClick={() => setIsNavOpen(false)}>Women</Link></li>
              <li><Link to="/men" onClick={() => setIsNavOpen(false)}>Men</Link></li>
              <li><Link to="/children" onClick={() => setIsNavOpen(false)}>Children</Link></li>
              <li><Link to="/beauty" onClick={() => setIsNavOpen(false)}>Beauty</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div> */}

      <div className="right">
        <Link to="/signin">Signin/signUp</Link>
        <Link to="/order" onClick={() => setIsNavOpen(false)}>Order History</Link>
        {/* <Link to="/wishlist" onClick={() => setIsNavOpen(false)}>💖 Wishlist</Link> */} 
        <Link to="/cart" onClick={() => setIsNavOpen(false)}>🛒 Cart</Link>
      </div>
    </header>
  );
};

export default Header;

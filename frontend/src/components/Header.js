import React, { useState } from 'react';
import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaBars,
  FaChevronDown
} from 'react-icons/fa';
import '../styles/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="custom-header">
      <div className="header-wrapper">
        {/* Toggle Menu Icon */}
        <button className="menu-toggle mobile-only" onClick={toggleMenu} aria-label="Toggle navigation">
          <FaBars />
        </button>

        {/* Logo */}
        <div className="logo-center">
          <h4 className="logo-text">LOGO</h4>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <button className="nav-button">SHOP</button>
          <button className="nav-button">SKILLS</button>
          <button className="nav-button">STORIES</button>
          <button className="nav-button">ABOUT</button>
          <button className="nav-button">CONTACT US</button>
        </nav>

        {/* Icons */}
        <div className="icon-group right-icons">
          <FaSearch className="icon" />
          <FaHeart className="icon" />
          <FaShoppingBag className="icon" />
          <FaUser className="icon" />
          <span className="lang-dropdown desktop-only">ENG <FaChevronDown /></span>
        </div>
      </div>
    </header>
  );
};

export default Header;

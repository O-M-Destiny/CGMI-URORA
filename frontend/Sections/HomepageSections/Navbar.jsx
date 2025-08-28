import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const isManualCloseRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      isManualCloseRef.current = false; 
      setIsOpen(false);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.pageYOffset;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.width = '100vw';
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (isManualCloseRef.current) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant'
        });
        isManualCloseRef.current = false;
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenuWithScrollRestore();
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    isManualCloseRef.current = false;
    setIsOpen(false);
  };


  const closeMenuWithScrollRestore = () => {
    isManualCloseRef.current = true;
    setIsOpen(false);
  };

  
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenuWithScrollRestore();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/ministries', label: 'Ministries' },
    { to: '/contact', label: 'Contact' },
    { to: '/resources', label: 'Resources' },
    { to: '/join-us', label: 'Join Us' },
    { to: '/shop', label: 'Shop' },
    { to: '/give', label: 'Give', isSpecial: true }
  ];

  const renderNavItem = (item, isMobile = false) => (
    <li key={item.to} className="nav-item">
      <NavLink 
        to={item.to} 
        className={({ isActive }) => 
          `nav-link ${item.isSpecial ? 'btn-give' : ''} ${isActive ? 'active' : ''}`
        }
        onClick={isMobile ? closeMenu : undefined}
      >
        {item.label}
      </NavLink>
    </li>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>CGMI URORA</h2>
        </div>
        
        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navItems.map(item => renderNavItem(item))}
        </ul>

        {/* Mobile Hamburger */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          type="button"
        >
          <span className="bar" aria-hidden="true"></span>
          <span className="bar" aria-hidden="true"></span>
          <span className="bar" aria-hidden="true"></span>
        </button>

        {/* Mobile Menu with Animation */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              className="mobile-menu-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="mobile-menu-overlay" 
                onClick={closeMenuWithScrollRestore}
                aria-hidden="true"
              />
              <motion.ul 
                className="mobile-menu"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ 
                  type: 'tween', 
                  ease: 'easeInOut',
                  duration: 0.3
                }}
                role="menu"
              >
                {navItems.map(item => renderNavItem(item, true))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
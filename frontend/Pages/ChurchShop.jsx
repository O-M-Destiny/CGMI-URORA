import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Sections/HomepageSections/Footer';
import Navbar from '../Sections/HomepageSections/Navbar'
import "./styling/churchShop.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChurchShop = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 365);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/public/notify_me`, {
        email
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
      });

      console.log('Success:', response.data);
      
      alert("Thank you! You'll be notified when we launch.");
      setEmail('');

    } catch (error) {
      console.error('Submission error:', error);
      
      // Check if this is a duplicate email error or any error mentioning already exists
      if (error.response && error.response.data?.detail) {
        const detail = error.response.data.detail;
        if (detail.toLowerCase().includes('already exists') || 
            detail.toLowerCase().includes('duplicate') ||
            detail.toLowerCase().includes('email') && detail.toLowerCase().includes('exists')) {
          alert('Email already submitted! We have your details and will get back to you soon.');
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        alert('Email already submitted! We have your details and will get back to you soon.');
        // alert('Something went wrong. Please try again.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const products = [
    {
      id: 1,
      name: "Christian Books",
      description: "Inspiring reads for spiritual growth",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
        </svg>
      )
    },
    {
      id: 2,
      name: "Faith Gifts",
      description: "Meaningful gifts for loved ones",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    {
      id: 3,
      name: "Worship Music",
      description: "CDs and digital downloads",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      )
    },
    {
      id: 4,
      name: "Church Merchandise",
      description: "T-shirts, mugs, and more",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    }
  ];



  return (
    <div className="church-shop">
      <Navbar />
      <section className="coming-soon-hero">
        <div className="container">
          <div className="coming-soon-content">
            <div className="animated-logo" >
              <div className="logo-circle">
                <svg className="rotating-icon" width="80" height="80" viewBox="0 0 24 24" fill="#000" >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
              </div>
              <div className="pulse-rings">
                <div className="pulse-ring"></div>
                <div className="pulse-ring"></div>
                <div className="pulse-ring"></div>
              </div>
            </div>

            <h1 className="coming-soon-title">
              <span className="title-word">Church</span>
              <span className="title-word">Shop</span>
              <span className="title-word">Coming</span>
              <span className="title-word">Soon</span>
            </h1>

            <p className="coming-soon-subtitle">
              We're preparing something special for you! Our online shop will feature books, gifts, and resources to support your spiritual journey.
            </p>

            <div className="products-preview">
              <h3>What We'll Offer</h3>
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-icon">
                      {product.icon}
                    </div>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="progress-section">
              <h3>Launch Progress</h3>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <p className="progress-text">15% Complete</p>
            </div>

            <div className="countdown-section">
              <h3>Estimated Launch</h3>
              <div className="countdown-timer">
                {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                  <div className="countdown-item" key={unit}>
                    <span className="countdown-number">{countdown[unit]}</span>
                    <span className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="notify-section">
              <h3>Get Notified When We Launch</h3>
              <form className="notify-form" onSubmit={handleSubmit}>
                <div className="form-group-inline">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? 'Subscribing...' : 'Notify Me'}
                  </button>
                </div>
              </form>
              <p className="privacy-note">We respect your privacy.</p>
            </div>

            <div className="social-share">
              <h4>Share the Excitement</h4>
              <div className="share-buttons">
                <Link to="https://www.facebook.com/profile.php?id=61577856122732" className="share-btn facebook" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.326v21.348C0 23.404.596 24 1.325 24h11.488v-9.294H9.692V11.01h3.121V8.414c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.404 24 22.674V1.326C24 .596 23.403 0 22.675 0z" />
                  </svg>
                </Link>
                <a href="mailto:info@churchshop.com" className="share-btn email" aria-label="Email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 13.5L2 6.75V18h20V6.75L12 13.5zM12 11L2 4h20L12 11z" />
                  </svg>
                </a>
                <Link to="https://www.instagram.com/cgmiurora?igsh=NGs5YndrbWdxM2M5" target="_blank" rel="noopener noreferrer" className="share-btn instagram" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.75 2C5.67893 2 4 3.67893 4 5.75V18.25C4 20.3211 5.67893 22 16.25 22H16.25C18.3211 22 20 20.3211 20 18.25V5.75C20 3.67893 18.3211 2 16.25 2H7.75zM12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7zM17.5 6C18.3284 6 19 6.67157 19 7.5C19 8.32843 18.3284 9 17.5 9C16.6716 9 16 8.32843 16 7.5C16 6.67157 16.6716 6 17.5 6z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ChurchShop;
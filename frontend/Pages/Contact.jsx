import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Sections/HomepageSections/Navbar';
import Footer from '../Sections/HomepageSections/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to extract readable error messages from Pydantic validation errors
const extractErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle response errors first
  if (error.response) {
    const detail = error.response.data?.detail;
    
    // If detail is an array of validation errors (Pydantic format)
    if (Array.isArray(detail)) {
      return detail.map(err => {
        // Get field name and make it user-friendly
        const fieldPath = err.loc || [];
        let fieldName = 'Field';
        
        if (fieldPath.includes('phone_number')) {
          fieldName = 'Phone Number';
        } else if (fieldPath.includes('email')) {
          fieldName = 'Email';
        } else if (fieldPath.includes('name')) {
          fieldName = 'Name';
        } else if (fieldPath.includes('message')) {
          fieldName = 'Message';
        } else if (fieldPath.includes('subject')) {
          fieldName = 'Subject';
        }
        
        // Clean up the error message
        let message = err.msg || 'Invalid value';
        if (message.includes('Invalid phone number')) {
          message = 'Please enter a valid Nigerian number (e.g., +2348012345678, 08012345678) or international number with country code';
        } else if (message.includes('value is not a valid email address')) {
          message = 'Please enter a valid email address';
        }
        
        return `${fieldName}: ${message}`;
      }).join('\n');
    }
    
    // If detail is a string
    if (typeof detail === 'string') {
      return detail;
    }
    
    // If detail is an object, try to get the message
    if (typeof detail === 'object' && detail?.msg) {
      return detail.msg;
    }
    
    // Fallback to status text
    return error.response.statusText || 'Server error occurred';
  }
  
  // Network or other errors
  return error.message || "We're having trouble connecting. Please check your internet connection and try again.";
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}/public/contact`, formData, {
        headers: { "Content-Type": "application/json" }
      });

      setStatus({
        type: 'success',
        message: 'Thank you! We will get back to you soon.'
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Submission error:", error);
      
      // Use the helper function to extract readable error message
      const errorMessage = extractErrorMessage(error);
      
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
      // Clear status after 5 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="lead">We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-main" style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div className="contact-form" style={{
            backgroundColor: 'var(--background-white)',
            padding: 'var(--space-8)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{
              color: 'var(--primary-blue)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>Send Us a Message</h3>

            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: status.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  style={{ width: '100%', padding: '10px' }}
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={{ width: '100%', padding: '10px' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number || ''}
                    onChange={handleChange}
                    placeholder="+2348012345678"
                    style={{ width: '100%', padding: '10px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject || ''}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px' }}
                >
                  <option value="">Select a subject</option>
                  <option value="General">General</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Pastoral">Pastoral</option>
                  <option value="Membership">Membership</option>
                  <option value="Giving">Giving</option>
                  <option value="Event">Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message || ''}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Enter your message here..."
                  style={{ width: '100%', padding: '10px', minHeight: '120px' }}
                ></textarea>
              </div>

              <div className="form-submit" style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: 'var(--space-4) var(--space-8)',
                    fontSize: '1.125rem',
                    minHeight: '56px'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <div className="contact-map" style={{ marginTop: 'var(--space-10)' }}>
        <h3 style={{
          color: 'var(--primary-blue)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center', 
          marginTop: "-44px"
        }}>Find Us on the Map</h3>

        <div style={{
          width: '100%',
          height: '400px',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)', 
          marginBottom: "14px"
        }}>
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31721.365272165116!2d5.68730726388856!3d6.371955863980637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d5c464e2041d%3A0x44ce81d8e68efce6!2sChurch%20Of%20God%20Mission%20Int%20Urora!5e0!3m2!1sen!2sng!4v1753707715724!5m2!1sen!2sng" 
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
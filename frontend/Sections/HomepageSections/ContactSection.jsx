import { useState } from "react";
import axios from "axios";

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
        
        if (fieldPath.includes('phone')) {
          fieldName = 'Phone Number';
        } else if (fieldPath.includes('email')) {
          fieldName = 'Email';
        } else if (fieldPath.includes('name')) {
          fieldName = 'Name';
        } else if (fieldPath.includes('message')) {
          fieldName = 'Message';
        } else if (fieldPath.includes('how_to_help')) {
          fieldName = 'How can we help you';
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

const ContactSection = () => {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [howToHelpYou, setHowToHelpYou] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    getConnected(); // Call async function
  };

  // Async send to backend
  const getConnected = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post("http://127.0.0.1:8000/public/get_connected", {
        name,
        email,
        phone,
        how_to_help: howToHelpYou,
        message
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log("Server response:", response.data);
      
      // Always show a fixed success message
      setStatus({ 
        type: 'success', 
        message: 'Thank you! We will get back to you soon.' 
      });

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setHowToHelpYou("");
      setMessage("");

      // Auto-clear status
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    } catch (error) {
      console.error("Submission error:", error);
      
      // Use the helper function to extract readable error message
      const errorMessage = extractErrorMessage(error);
      
      setStatus({ 
        type: 'error', 
        message: errorMessage 
      });
      
      // Auto-clear status
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="section-title">Visit Us</h2>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>15, Osagiede Agho Street<br />Urora, Benin City</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+234 8035659822</p> 
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@cgmiurora.org</p>
                </div>
              </div>
            </div>
            <div className="service-times-contact">
              <h4>Service Times</h4>
              <p>
                Sunday Service: 7:00 AM<br />
                Wednesday Bible Study: 5:00 PM - 6:00 PM<br />
                Friday Prayer Meeting: 6:30 AM - 7:30 AM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form" style={{marginBottom:"20px"}}>
            <h3>Get Connected</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number (e.g., +2348012345678)"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select value={howToHelpYou} onChange={(e) => setHowToHelpYou(e.target.value)} required>
                  <option value="">How can we help you?</option>
                  <option value="planning to visit">Planning to Visit</option>
                  <option value="Prayer Request">Prayer Request</option>
                  <option value="Ministry Information">Ministry Information</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status.message && (
                <div style={{
                  marginTop: "15px",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  whiteSpace: "pre-line",
                  backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: status.type === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  textAlign: status.type === 'success' ? 'center' : 'left'
                }}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
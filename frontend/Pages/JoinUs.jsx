import React, { useState, useEffect } from 'react';
import Footer from '../Sections/HomepageSections/Footer';
import Navbar from '../Sections/HomepageSections/Navbar';
import "./styling/JoinUs.css"
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JoinUs = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [nextService, setNextService] = useState(getNextService());

  function calculateTimeLeft() {
    const now = new Date();
    const nextSunday = new Date();

    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(10, 0, 0, 0);

    if (now.getDay() === 0 && now.getHours() < 10) {
      nextSunday.setDate(now.getDate());
    }

    if (now.getDay() === 0 && now.getHours() >= 10) {
      nextSunday.setDate(now.getDate() + 7);
    }

    const difference = nextSunday - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  function getNextService() {
    const now = new Date();
    const nextSunday = new Date();

    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(10, 0, 0, 0);

    if (now.getDay() === 0 && now.getHours() < 10) {
      nextSunday.setDate(now.getDate());
      return "Today at 07:00 AM";
    }

    if (now.getDay() === 0 && now.getHours() >= 10) {
      nextSunday.setDate(now.getDate() + 7);
    }

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return `Next Sunday, ${nextSunday.toLocaleDateString('en-US', options)} at 07:00 AM`;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    howHeard: '',
    questions: ''
  });

  // Add error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Phone number is required";
    }

    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Nigerian number patterns
    const nigerianPatterns = [
      /^(\+234|234|0)[7-9][01][0-9]{8}$/, // Nigerian mobile numbers
      /^(\+234|234|01)[0-9]{7,8}$/, // Nigerian landline numbers
    ];

    // International number pattern (country code + number)
    const internationalPattern = /^\+[1-9]\d{1,14}$/;

    // Check if it matches Nigerian patterns
    const isNigerianNumber = nigerianPatterns.some(pattern => pattern.test(phone.replace(/\s/g, '')));
    
    // Check if it matches international pattern
    const isInternationalNumber = internationalPattern.test(phone.replace(/\s/g, ''));

    if (!isNigerianNumber && !isInternationalNumber) {
      return "Please enter a valid Nigerian number (e.g., +2348012345678, 08012345678) or international number with country code";
    }

    return "";
  };

  const validateVisitDate = (visitDate) => {
    if (!visitDate) {
      return "Please select when you're planning to visit";
    }
    return "";
  };

  const validateHowHeard = (howHeard) => {
    if (!howHeard) {
      return "Please let us know how you heard about us";
    }
    return "";
  };

  // Real-time validation as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field and validate in real-time
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        const nameError = validateName(value);
        if (nameError) {
          newErrors.name = nameError;
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailError = validateEmail(value);
        if (emailError) {
          newErrors.email = emailError;
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        const phoneError = validatePhone(value);
        if (phoneError) {
          newErrors.phone = phoneError;
        } else {
          delete newErrors.phone;
        }
        break;
      case 'visitDate':
        const visitDateError = validateVisitDate(value);
        if (visitDateError) {
          newErrors.visitDate = visitDateError;
        } else {
          delete newErrors.visitDate;
        }
        break;
      case 'howHeard':
        const howHeardError = validateHowHeard(value);
        if (howHeardError) {
          newErrors.howHeard = howHeardError;
        } else {
          delete newErrors.howHeard;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // === MAPPERS FOR ENUMS ===
  const mapVisitDate = (value) => {
    switch (value) {
      case 'this-sunday': return 'This Sunday';
      case 'next-sunday': return 'Next Sunday';
      case 'within-month': return 'Within The next month';
      case 'not-sure': return 'Not sure yet';
      default: return 'Not sure yet';
    }
  };

  const mapHowHeard = (value) => {
    switch (value) {
      case 'friend-family': return 'Friend / Family';
      case 'online': return 'Online Search';
      case 'social-media': return 'Social Media';
      case 'drive-by': return 'Drove By';
      case 'other': return 'Other';
      default: return 'Other';
    }
  };

  // === HANDLE SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const validationErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      visitDate: validateVisitDate(formData.visitDate),
      howHeard: validateHowHeard(formData.howHeard)
    };

    // Remove empty error messages
    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value !== "")
    );

    setErrors(filteredErrors);

    // If there are validation errors, stop submission
    if (Object.keys(filteredErrors).length > 0) {
      setIsSubmitting(false);
      // Focus on first error field
      const firstErrorField = Object.keys(filteredErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      plan_of_visit: mapVisitDate(formData.visitDate),
      how_you_heard_us: mapHowHeard(formData.howHeard),
      questions_or_special_requests: formData.questions 
    };

    try {
      const response = await fetch(`${API_BASE_URL}/public/plan_visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Failed to submit: ${errorData.detail || 'Unknown error'}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      
      alert("Thank you for letting us know you're coming! We'll be in touch soon.");

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        visitDate: '',
        howHeard: '',
        questions: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: error.message || "Something went wrong. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="join-us-page">
      <Navbar/>
      
      {/* Hero Section */} 
      <section className="page-header">
        <div className="container">
          <h1>We Can't Wait to Meet You!</h1>
          <p className="lead">Join us this weekend and experience our welcoming community</p>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="countdown-section">
        <div className="container text-center">
          <h2>Our Next Service Starts In</h2>
          <p className="lead">{nextService}</p>
          
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>

          <div>
            <a href="#plan-your-visit" className="btn-cta">Plan Your Visit</a>
          </div>
        </div>
      </section> 

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title text-center">What to Expect</h2>
          <p className="section-subtitle text-center">Here's why you'll love visiting CGMI URORA</p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3>Welcoming Atmosphere</h3>
                <p>From the moment you arrive, you'll be greeted with warm smiles and helpful directions. Our hospitality team is ready to make you feel at home.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div>
                <h3>Practical Bible Teaching</h3>
                <p>Our messages are biblical, relevant, and applicable to everyday life. You'll leave with clear takeaways to help you grow in your faith.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3>Engaging Kids Ministry</h3>
                <p>Your children will love our safe, fun, and age-appropriate programs designed to teach them about Jesus in creative ways.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
              </div>
              <div>
                <h3>Inspiring Worship</h3>
                <p>Our worship team leads with contemporary music and timeless hymns in a style that's engaging and God-honoring.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <h3>No Pressure</h3>
                <p>You won't be singled out as a visitor. Come as you are and participate at whatever level you feel comfortable.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div>
                <h3>Free Gift</h3>
                <p>Stop by our welcome center after service to receive a free gift as our way of saying thanks for visiting!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Visit Form */}
      <section id="plan-your-visit" className="visit-form-section">
        <div className="container">
          <div className="visit-form-container">
            <h2 className="section-title text-center">Plan Your Visit</h2>
            <p className="section-subtitle text-center">Let us know you're coming and we'll make sure you have a great experience</p>

            {errors.submit && (
              <div className="error-message submit-error" style={{
                background: '#fee', 
                border: '1px solid #f66', 
                color: '#c33', 
                padding: '12px', 
                borderRadius: '4px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="visit-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    style={errors.name ? {borderColor: '#f66'} : {}}
                    required 
                  />
                  {errors.name && (
                    <div className="error-message" style={{color: '#c33', fontSize: '14px', marginTop: '5px'}}>
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    style={errors.email ? {borderColor: '#f66'} : {}}
                  />
                  {errors.email && (
                    <div className="error-message" style={{color: '#c33', fontSize: '14px', marginTop: '5px'}}>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    style={errors.phone ? {borderColor: '#f66'} : {}}
                    placeholder="e.g., +2348012345678 or 08012345678"
                    required
                  />
                  {errors.phone && (
                    <div className="error-message" style={{color: '#c33', fontSize: '14px', marginTop: '5px'}}>
                      {errors.phone}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="visitDate">When Planning to Visit? *</label>
                  <select 
                    id="visitDate" 
                    name="visitDate" 
                    value={formData.visitDate}
                    onChange={handleChange}
                    className={errors.visitDate ? 'error' : ''}
                    style={errors.visitDate ? {borderColor: '#f66'} : {}}
                    required
                  >
                    <option value="">Select a date</option>
                    <option value="this-sunday">This Sunday</option>
                    <option value="next-sunday">Next Sunday</option>
                    <option value="within-month">Within the next month</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {errors.visitDate && (
                    <div className="error-message" style={{color: '#c33', fontSize: '14px', marginTop: '5px'}}>
                      {errors.visitDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>How Did You Hear About Us? *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="howHeard" 
                        value="friend-family" 
                        checked={formData.howHeard === 'friend-family'}
                        onChange={handleChange}
                        required
                      /> Friend/Family
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="howHeard" 
                        value="online" 
                        checked={formData.howHeard === 'online'}
                        onChange={handleChange}
                      /> Online Search
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="howHeard" 
                        value="social-media" 
                        checked={formData.howHeard === 'social-media'}
                        onChange={handleChange}
                      /> Social Media
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="howHeard" 
                        value="drive-by" 
                        checked={formData.howHeard === 'drive-by'}
                        onChange={handleChange}
                      /> Drove By
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="howHeard" 
                        value="other" 
                        checked={formData.howHeard === 'other'}
                        onChange={handleChange}
                      /> Other
                    </label>
                  </div>
                  {errors.howHeard && (
                    <div className="error-message" style={{color: '#c33', fontSize: '14px', marginTop: '5px'}}>
                      {errors.howHeard}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="questions">Any Questions or Special Requests?</label>
                  <textarea 
                    id="questions" 
                    name="questions" 
                    value={formData.questions}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-submit">
                <button 
                  type="submit" 
                  className="btn btn-primary large" 
                  disabled={isSubmitting}
                  style={isSubmitting ? {opacity: '0.7', cursor: 'not-allowed'} : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="expect-section">
        <div className="container">
          <h2 className="section-title text-center">Your First Visit</h2>
          <p className="section-subtitle text-center">Here's what will happen when you arrive</p>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div>
                <h3>Parking</h3>
                <p>Look for our guest parking spots near the main entrance. Our parking team will direct you if needed.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div>
                <h3>Welcome Center</h3>
                <p>Stop by our welcome desk where we'll greet you, answer questions, and help you get oriented.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div>
                <h3>Kids Check-In</h3>
                <p>If you have children, our secure check-in system will help you register them for age-appropriate classes.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div>
                <h3>Find a Seat</h3>
                <p>Our ushers will help you find a comfortable seat in the sanctuary. Arrive 15 minutes early for best seating.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Visit?</h2>
          <p className="lead">
            We're saving a seat just for you! Join us this Sunday at 08:00 AM.
          </p>
          <div className="cta-buttons">
            <a href="#plan-your-visit" className="btn btn-primary">Plan Your Visit</a>
            <Link to="/contact" className="btn btn-secondary">Get Directions</Link>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
};

export default JoinUs;
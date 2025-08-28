import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">CHURCH OF GOD MISSION INTERNATIONAL</h1>
          <p className="hero-subtitle">URORA PROVINCIAL HEADQUARTERS</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary">Join Us Sunday</Link>
            <Link to="/about" className="btn btn-secondary-color">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  )
}

export default Hero
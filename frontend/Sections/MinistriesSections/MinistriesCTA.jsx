import React from 'react'
import { Link } from 'react-router-dom'
import './Ministries.css'

const MinistriesCTA = () => {
  return (
    <section className="get-involved-cta">
        <div className="container">
          <h2>Ready to Get Involved?</h2>
          <p className="lead">
            Whatever your gifts or interests, there's a place for you to serve at Grace Community Church.
          </p>
          <div className="cta-buttons">
            <Link to="/join-us" className="btn btn-primary">Explore Opportunities</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
  )
}

export default MinistriesCTA
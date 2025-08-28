import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="join-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Us?</h2>
            <p className="lead">Experience the joy of worshiping together as a church family. All are welcome!</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Directions</Link>
              <Link to="/join-us" className="btn btn-secondary-color">Plan Your Visit</Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CTA
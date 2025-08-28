import React from 'react'
import { Link } from 'react-router-dom'
import './Ministries.css'

const MinistriesSupport = () => {
  return (
    <section className="support-ministries">
        <div className="container">
          <h2 className="section-title text-center">Support Ministries</h2>
          <p className="section-subtitle text-center">Teams that serve behind the scenes to make ministry happen</p>

          <div className="support-grid">
            <div className="support-card">
              <h3>ICT department</h3>
              <p>Empowering the church through technology, communication, innovation, and digital spiritual growth.</p>
              <Link to="/contact" className="learn-more">Join the Team →</Link>
            </div>

            <div className="support-card">
              <h3>Media Department</h3>
              <p>Create an Audience for the church Globally, showcasing the church Presence.</p>
              <Link to="/contact" className="learn-more">Serve With Us →</Link>
            </div>

            <div className="support-card">
              <h3>Technical Department</h3>
              <p>Use their technical skills to enhance our worship services through audio, video, and lighting.</p>
              <Link to="/contact" className="learn-more">Volunteer →</Link>
            </div>

            <div className="support-card">
              <h3>Urshers & Protocols</h3>
              <p>Help maintain our building and grounds to create an excellent environment for ministry.</p>
              <Link to="/contact" className="learn-more">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MinistriesSupport
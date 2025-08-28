import React from 'react'
import './homepage.css'
import pic from "./img/2025_theme.png"

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Our Story & Mission</h2>
            <p className="lead">For over 40 years, CGMI Urora Provincial Headquarters has been a beacon of hope and love in our community, bringing people together to worship, serve, and grow in their relationship with Christ.</p>
            <p>We believe that every person is created in God's image and has infinite worth. Our mission is to create an environment where people can encounter God's love, discover their purpose, and use their gifts to make a difference in the world.</p>
            
            <div className="faith-statement">
              <p>Our Statement of Faith</p>
            </div>
            
            <div className="mission-values">
              <div className="value-item">
                <h4>Vision Statement</h4>
                <p>To build people into leadership, with global passion, deeply rooted in Christ through Right Living, Teamwork, Evangelism, Prayer.</p>
              </div>
              <div className="value-item">
                <h4>Mission Statement</h4>
                <p>Evangelizing the lost for their total transformation, Spirit, Soul, and body, developing them into leaders.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={pic} alt="Archbishop Margret Idahosa" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
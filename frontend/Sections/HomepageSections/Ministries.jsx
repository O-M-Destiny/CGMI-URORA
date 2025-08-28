import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import children from "./img/children.jpg"

const Ministries = () => {
  return (
    <section id="ministries" className="ministries">
      <div className="container">
        <h2 className="section-title text-center">Our Ministries</h2>
        <p className="section-subtitle text-center" style={{marginBottom:"20px"}}>
          Discover ways to grow, serve, and connect at every stage of life
        </p>
        <div className="ministries-grid">
          {/* Men Ministry */}
          <div className="ministry-card">
            <div className="ministry-image">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Men Ministry"
              />
            </div>
            <div className="ministry-content">
              <h3>Men Ministry</h3>
              <p>
                We are Men Fellowship of Church of God Mission, Urora Province, Benin City.
                We are godly men in Christ who fellowship together to serve and meet each
                other's needs through His word
              </p>
              <Link to="/ministries" className="learn-more">Learn More →</Link>
            </div>
          </div>

          {/* Women Ministry */}
          <div className="ministry-card">
            <div className="ministry-image">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Women Ministry"
              />
            </div>
            <div className="ministry-content">
              <h3>Women Ministry</h3>
              <p>
                We are CWFI, Urora Province, Benin City — a fellowship for married women, singles, 
                widows, and divorcees. Rooted in God's Word, we grow in strength and purpose together.                
              </p>
              <Link to="/ministries" className="learn-more">Learn More →</Link>
            </div>
          </div>

          {/* Youth Ministry */}
          <div className="ministry-card">
            <div className="ministry-image">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Youth Ministry"
              />
            </div>
            <div className="ministry-content">
              <h3>Youth Ministry</h3>
              <p>
                We are Christian Youth Fellowship International of Church of God Mission International,
                Urora Province, Benin City. We believe in soul winning and growing in the Word of God to
                impact our members and the Church positively.
              </p>
              <Link to="/ministries" className="learn-more">Learn More →</Link>
            </div>
          </div>

          {/* Children's Ministry */}
          <div className="ministry-card">
            <div className="ministry-image">
              <img
                src={children}
                alt="Children's Ministry"
              />
            </div>
            <div className="ministry-content">
              <h3>Children's Ministry</h3>
              <p>
                We teach children the foundation of Scripture,
                 helping them grow in wisdom, knowledge, and purpose to fulfill God's plan for their lives.
              </p>
              <Link to="/ministries" className="learn-more">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ministries

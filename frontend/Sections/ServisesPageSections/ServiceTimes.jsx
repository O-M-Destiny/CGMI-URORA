import React from 'react'

const ServiceTimes = () => {
  return (
    <section className="service-times">
        <div className="container">
          <div className="service-cards">
            <div className="service-card">
              <div className="service-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
              </div>
              <h3>Bible Study</h3>
              <p className="time">Wednesdays at 5:00 PM</p>
              <p className="description">Deep dive into Scripture with fellowship and discussion</p>
              <div className="service-details">
                <ul>
                  <li>Verse-by-verse study</li>
                  <li>Small group discussion</li>
                  <li>Prayer time</li>
                  <li>Light refreshments</li>
                </ul>
              </div>
            </div>
            <div className="service-card featured">
              <div className="service-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l4 4v2h3a1 1 0 0 1 1 1v13h-6v-6H10v6H4V9a1 1 0 0 1 1-1h3V6l4-4z"/>
              </svg>

              </div>
              <h3>Sunday Service</h3>
              <p className="time">Sundays at 07:00 AM</p>
              <p className="description">Modern worship with live band and inspiring messages</p>
              <span className="featured-badge">Most Popular</span>
              <div className="service-details">
                <ul  >
                  <li className='sunday-list'>Sunday School</li>
                  <li className='sunday-list'>Modern Christian music</li>
                  <li className='sunday-list'>The Word of God</li>
                  <li className='sunday-list'>Interactive elements</li>
                </ul>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h3v2h-3v3h-2v-3H8v-2h3V8h2v5z"/>
            </svg>
              </div>
              <h3>Prayer Meeting</h3>
              <p className="time">Friday's at 6:30 AM - 7:30 AM</p>
              <p className="description">Strengthening faith through prayer and fellowship</p>
              <div className="service-details">
                <ul>
                  <li>Anointing service</li>
                  <li>Prophetic declarations</li>
                  <li>Deliverance prayers</li>
                  <li>Worship and impartation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ServiceTimes
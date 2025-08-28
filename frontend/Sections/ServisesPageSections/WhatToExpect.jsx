import React from 'react'

const WhatToExpect = () => {
  return (
    <section className="what-to-expect">
        <div className="container">
          <h2 className="section-title text-center">What to Expect</h2>
          <div className="expect-grid">
            <div className="expect-item">
              <div className="expect-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3>Warm Welcome</h3>
              <p>Our friendly greeters will welcome you at the door and help you feel at home from the moment you arrive.</p>
            </div>
            <div className="expect-item">
              <div className="expect-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h3>Inspiring Worship</h3>
              <p>Experience meaningful worship through music, prayer, and Scripture that will uplift your spirit.</p>
            </div>
            <div className="expect-item">
              <div className="expect-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3>Biblical Teaching</h3>
              <p>Hear practical, life-changing messages from God's Word that you can apply to your daily life.</p>
            </div>
            <div className="expect-item">
              <div className="expect-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.83 0-1.5.67-1.5 1.5v6h-2v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6H8v-6c0-.83-.67-1.5-1.5-1.5S5 8.67 5 9.5v6H3v-6c0-.83-.67-1.5-1.5-1.5S0 8.67 0 9.5V22h4v-6h2v6h4v-6h2v6h8z"/>
                </svg>
              </div>
              <h3>Community Connection</h3>
              <p>Meet wonderful people and enjoy refreshments and conversation after each service.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhatToExpect
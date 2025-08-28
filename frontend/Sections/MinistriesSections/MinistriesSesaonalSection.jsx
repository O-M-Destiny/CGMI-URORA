import React from 'react'
import './Ministries.css'

const MinistriesSesaonalSection = () => {
  return (
    <section className="seasonal-ministries">
        <div className="container">
          <h2 className="section-title text-center">Seasonal Ministries</h2>
          <p className="section-subtitle text-center">Special programs offered at different times throughout the year</p>

          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">
                <span className="month">Summer</span>
                <span className="day">VBS</span>
              </div>
              <div className="event-content">
                <h3>Vacation Bible School</h3>
                <p>Our annual summer program for kids featuring Bible stories, music, games, and more!</p>
                <a href="/vbs" className="learn-more">Register Now →</a>
              </div>
            </div>

            <div className="event-card">
              <div className="event-date">
                <span className="month">Fall</span>
                <span className="day">Small Groups</span>
              </div>
              <div className="event-content">
                <h3>Fall Small Groups</h3>
                <p>Join a small group this fall for Bible study, prayer, and fellowship in homes throughout our area.</p>
                <a href="/small-groups" className="learn-more">Find a Group →</a>
              </div>
            </div>

            <div className="event-card">
              <div className="event-date">
                <span className="month">Winter</span>
                <span className="day">Retreat</span>
              </div>
              <div className="event-content">
                <h3>Winter Retreat</h3>
                <p>Our annual winter retreat for youth and adults featuring worship, teaching, and outdoor activities.</p>
                <a href="/retreat" className="learn-more">Sign Up →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MinistriesSesaonalSection
import React from 'react'
import { Link } from "react-router-dom"
import './homepage.css'

const EventsSection = () => {
  return (
    <section id="events" className="events">
      <div className="container">
        <h2 className="section-title text-center">Upcoming Programs</h2>
        <div className="events-grid">
          <div className="event-card">
            <div className="event-date">
              <span className="month">Jul</span>
              <span className="day">17</span>
            </div>
            <div className="event-content">
              <h3>Provincial Pastor Day</h3>
              <p className="event-time">📆 Sunday</p>
              <p className="event-location">📍 Church Hall</p>
              <p>Join us for a powerful celebration honoring our Provincial Pastor. 
                Experience heartfelt worship, uplifting messages,
                 and a time of spiritual impartation with the church family.</p>
              <Link to="/give" className="btn btn-outline btn-small">Send a Seed</Link>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-date">
              <span className="month">Aug</span>
              <span className="day">04</span>
            </div>
            <div className="event-content">
              <h3>Mega Convention 2025</h3>
              <p className="event-time">📆 Saturday 9:00 AM - 4:00 PM</p>
              <p className="event-location">📍 Balm Of Gilead City</p>
              <p>Don't miss this life-transforming convention! A full day of anointed teachings,
                 prophetic declarations, 
                and dynamic worship designed to refresh your spirit and elevate your walk with God.</p>
              <Link to="https://cgmi-megacon.org/reg2025/" className="btn btn-outline btn-small">Register Now</Link>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-date">
              <span className="month">Aug</span>
              <span className="day">09</span>
            </div>
            <div className="event-content">
              <h3>Break-Through Service</h3>
              <p className="event-time">📆 Sunday | 6:30 AM – 8:00 AM </p>
              <p className="event-location"> 📍 Enya Branch</p>
              <p>Start your Saturday in God's presence! This early morning service is focused on deliverance, 
                breakthrough prayers, and prophetic release to empower your week ahead.</p>
              <Link to="/contact">
                <span className="btn btn-outline btn-small">Plan Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
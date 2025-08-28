import React from 'react'

const SpecialServices = () => {
  return (
     <section className="special-services">
        <div className="container">
          <h2 className="section-title text-center">Special Services & Programs</h2>
          <div className="special-grid">
            <div className="special-card">
              <h3>Impartation Service</h3>
              <p className="special-date">Beginning & Half of the Year</p>
              <p>Spiritual empowerment through prayer and laying on of hands.</p>
              <ul>
                <li>First Month - 6:00 AM - 8:00 AM  </li>
                <li>Second Month - 7:00 AM - 8:00 AM</li>
              </ul>
            </div>
            <div className="special-card">
              <h3>Church Monthly Envagelism</h3>
              <p className="special-date">Every 2nd Wenesday and Last Friday of the Month</p>
              <p>Church-wide outreach to share the Gospel in the community.</p>
              <ul>
                <li>5:00 PM - Church Crusade (Wednessday)</li>
                <li>7:00 AM - Provincial Crusade (Friday)</li>

              </ul>
            </div>
            <div className="special-card">
              <h3>Baptism Classes</h3>
              <p className="special-date">Every Sunday</p>
              <p>Biblical teaching on baptism for new believers.</p>
              <ul>
                <li>Baptism preparation class</li>
                <li>Public declaration of faith</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  )
}

export default SpecialServices
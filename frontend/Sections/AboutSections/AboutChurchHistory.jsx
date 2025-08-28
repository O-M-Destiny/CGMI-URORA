import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

import church_history from "./img/church_history.png"

const AboutChurchHistory = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section className="church-history">
      <div className="container">
        <div className="history-content">
          <div>
            <h2 className="section-title">Our Humble Beginnings</h2>
            <p>Church Of God Mission was founded in 1952 by a small group of believers who wanted to create a Christ-centered community in the heart of the city. What began as a modest gathering in a rented storefront has grown into a vibrant congregation serving thousands.</p>

            <p>In 2015, under the leadership of Rev Chris Aghedosa, we built our first permanent sanctuary. This was a time of tremendous growth as the church became known for its commitment to biblical teaching and community outreach.</p>

            <p>The 1980s saw the establishment of our food pantry and homeless ministry, cementing our reputation as a church that cares for both spiritual and physical needs. Today, under the leadership of Rev Dr. Joshua Ofuedo, we continue this legacy of faith and service.</p>
          </div>
          <div className="about-image">
            <img src={church_history} alt="Church Old Look" />
          </div>
        </div>

        <div className="milestone-stats" ref={ref}>
          <div className="stat">
            <span className="stat-number">
              {inView && <CountUp end={40} duration={2} />}+
            </span>
            <span className="stat-label">Years Serving</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {inView && <CountUp end={4} duration={2} />}
            </span>
            <span className="stat-label">Ministries</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {inView && <CountUp end={350} duration={2} separator="," />}+
            </span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {inView && <CountUp end={3} duration={2} />}
            </span>
            <span className="stat-label">CGMI Branches</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutChurchHistory

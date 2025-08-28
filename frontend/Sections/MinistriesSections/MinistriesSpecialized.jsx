import React from 'react'
import { Link } from 'react-router-dom'
import './Ministries.css'
import cwfi_choir from "./img/cwfi_choir.jpg"
import solution_choir from "./img/solution_choir.jpg"

const MinistriesSpecialized = () => {
  return (
    <section className="specialized-ministries">
        <div className="container">
          <h2 className="section-title text-center">Specialized Ministries</h2>
          <p className="section-subtitle text-center">Programs serving specific needs in our church and community</p>

          <div className="ministries-grid">
            <div className="ministry-card">
              <div className="ministry-image">                
                <img src={solution_choir} alt="solution choir" />
              </div>
              <div className="ministry-content">
                <h3>Solution Choir</h3>
                <p>We lead worship with spirit-filled music, inspiring the congregation and glorifying God through powerful praise and heartfelt songs.</p>
                <div className="btn-container">
                  <Link to="/contact" className="btn btn-secondary">Get Involved</Link>
                </div>
              </div>
            </div>

            <div className="ministry-card reverse">
              <div className="ministry-image">
                <img src={cwfi_choir} alt="dwfi" />
              </div>
              <div className="ministry-content">
                <h3>CWFI Choir</h3>
                <p>We are women of faith, lifting our voices in unity to worship, inspire, and support the church through soulful, spirit-led music ministry.</p>
                <div className="btn-container">
                  <Link to="/contact" className="btn btn-secondary">Join a Group</Link>
                </div>
              </div>
            </div>

            <div className="ministry-card">
              <div className="ministry-image">
                <img src="https://images.unsplash.com/photo-1498753427761-548428edfa67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Women's Ministry" />
              </div>
              <div className="ministry-content">
                <h3>Sunday School Team</h3>
                <p>We teach God's Word to children and youth, guiding their growth with engaging lessons and mentorship.</p>
                <div className="btn-container">
                  <Link to="/contact" className="btn btn-secondary">Find Community</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MinistriesSpecialized
import React from 'react'

const AboutStatementOfFaith = () => {
  return (
    <section className="statement-faith">
        <div className="container">
          <h2 className="section-title text-center">Our 4 Cardinal Point</h2>
          <p className="section-subtitle text-center" style={{marginBottom:"20px"}}>The essential doctrines we believe as a church</p>

          <div className="faith-grid">
            <div className="faith-item">
              <h4>Right Living</h4>
              <p>We believe the Bible is the inspired, inerrant Word of God, our supreme authority in all matters of faith and conduct.</p>
            </div>
            <div className="faith-item">
              <h4>Teamwork</h4>
              <p>We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit, equal in power and glory.</p>
            </div>
            <div className="faith-item">
              <h4>Evangelism</h4>
              <p>We believe in the deity of Christ, His virgin birth, sinless life, atoning death, bodily resurrection, and imminent return.</p>
            </div>
            <div className="faith-item">
              <h4> Prayer</h4>
              <p>We believe salvation is by grace alone through faith alone in Christ alone, resulting in a transformed life.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutStatementOfFaith
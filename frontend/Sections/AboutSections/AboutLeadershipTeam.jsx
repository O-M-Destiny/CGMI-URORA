import React from 'react'
import head_pastor2 from "./img/head_pastor2.jpg"
import pastor_wife from "./img/pastor_wife.jpg"
import pastor_akpan from "./img/pastor_akpan.jpg"
import women_leader from "./img/women_leader.jpg"
import choir_md from "./img/choir_md.jpg"
import cwfi_choir_md from "./img/cwfi_choir_md.jpg"
import men_leader from "./img/men_leader.jpg"
import youth_leader from "./img/youth_leader.jpg"
import children_leader from "./img/children_leader.jpg"


const AboutLeadershipTeam = () => {
  return (
    <section className="leadership" style={{marginTop:"-70px"}}>
        <div className="container">
          <h2 className="section-title text-center">Our Leadership Team</h2>
          <p className="section-subtitle text-center" style={{marginBottom:"20px"}}>Meet the pastors and staff who serve our church family</p>

          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-image">
                  <img src={head_pastor2} alt="Rev Dr Joshua Ofuedo" />
              </div>
              <div className="leader-info">
                <h4>Rev Dr. Joshua Ofuedo</h4>
                <p className="leader-title">National Presbyter (Head Pastor)</p>
                <p className="leader-bio">Rev Dr Joshua Ofuedo serves as the Head Pastor and National Presbyter,
                   providing spiritual leadership and vision for the church. He is deeply committed to preaching the Word, equipping leaders,
                   and guiding the church in fulfilling its mission both locally and nationally.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
      
                <img src={pastor_wife} alt="Rev Mrs Edith Ofuedo" />
              </div>
              <div className="leader-info">
                <h4>Rev Mrs Edith Ofuedo</h4>
                <p className="leader-title">Pastor</p>
                <p className="leader-bio">Rev Mrs Edith Ofuedo faithfully assists the head pastor in ministry and plays a vital role in caring for the women of the church. She offers spiritual guidance, support, and encouragement through prayer, teaching, and personal mentorship.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                <img src={pastor_akpan} alt="Pastor Akpan" />
              </div>
              <div className="leader-info">
                <h4>Rev Raphael Akpan</h4>
                <p className="leader-title">Associate Pastor</p>
                <p className="leader-bio">A strong spiritual partner to the head pastor, overseeing ministries, pastoral care, and church growth with dedication and integrity.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
            
                <img src={men_leader} alt="Men Leader (Momoh)" />
              </div>
              <div className="leader-info">
                <h4>Deacon Momoh</h4>
                <p className="leader-title">Men's Leader</p>
                <p className="leader-bio">He leads our men with strength and integrity, fostering brotherhood, spiritual growth, and leadership through discipleship and service.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                <img src={women_leader} alt="" />
              </div>
              <div className="leader-info">
                <h4>Deaconess Hannah Aigbokhan</h4>
                <p className="leader-title">Women's Leader</p>
                <p className="leader-bio">A mother to many and guide to all women in the church, she empowers ladies to walk boldly in faith, purpose, and unity through Christ.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                <img src={choir_md} alt="Choir Music Director(Goodness Aigbokhan)" />
              </div>
              <div className="leader-info">
                <h4>Mr. Goodness Aigbokhan</h4>
                <p className="leader-title">Music Director</p>
                <p className="leader-bio">A gifted worship leader and musician, he orchestrates praise that touches heaven and cultivates a sound that ushers in God's presence.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                  <img src={cwfi_choir_md} alt="Cwfi Choir Music Director" />
              </div>
              <div className="leader-info">
                <h4>Deaconess Vivian Igbinomwanhia</h4>
                <p className="leader-title">Cwfi Choir Music Director</p>
                <p className="leader-bio">Mrs Name leads the CWFI Choir, a group of dedicated women 
                  who minister through music. She guides them with passion and unity,
                   ensuring their worship uplifts and inspires.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                <img src={youth_leader} alt="Mr. Efosa Ehigie" />
              </div>
              <div className="leader-info">
                <h4>Mr. Efosa Ehigie</h4>
                <p className="leader-title">Youth Leader</p>
                <p className="leader-bio">Passionate about the next generation, he inspires youth to live boldly for Christ through mentorship, vibrant programs, and real conversations.</p>
              </div>
            </div>
            {/*  */}
            <div className="leader-card">
              <div className="leader-image">
                  <img src={children_leader} alt="Mrs. Stella Momoh" />
              </div>
              <div className="leader-info">
                <h4>Deaconess Stella Momoh</h4>
                <p className="leader-title">Children Coordinator</p>
                <p className="leader-bio">She nurtures the hearts of our youngest members with love, teaching them God’s Word in fun, engaging, and age-appropriate ways.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutLeadershipTeam
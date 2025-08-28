// import React from 'react'
// import { useState, useEffect } from 'react'
// import './Giving.css'
// import church_project_img1 from "./img/church_project_img1.jpg"
// import church_project_img2 from "./img/church_project_img2.jpg"
// import church_project_img3 from "./img/church_project_img3.jpg"

// const GivingBuildingProject = () => {
//     const [animated, setAnimated] = useState(false);
        
//     useEffect(() => {
//         setAnimated(true);
//     }, []);
    
//     return (
//         <div className={`building-project ${animated ? 'animate' : ''}`}>
//             <h2>Our Building Project</h2>
            
//             <p className="project-description">
//                 We're expanding our facilities to serve our growing community. Any support towards this vision is greatly appreciated.
//             </p>
            
//             <div className="images-grid">
//                 <div className="main-image">
//                     <img 
//                         src={church_project_img1} 
//                         alt="Building Project"
//                     />
//                     <div className="image-overlay">
//                         Current church view
//                     </div>
//                 </div>
                
//                 <div className="secondary-images">
//                     <div className="secondary-image">
//                         <img 
//                             src={church_project_img2} 
//                             alt="Children's Area"
//                         />
//                     </div>
//                     <div className="secondary-image">
//                         <img 
//                             src={church_project_img3} 
//                             alt="Community Space"
//                         />
//                     </div>
//                 </div>
//             </div>
            
//             <div className="fund-notice">
//                 For building project donations, please add "Building Fund" in the reference
//             </div>
//         </div>
//     )
// }

// export default GivingBuildingProject
import React from 'react'
import { useState, useEffect } from 'react'
import './Giving.css'
import church_project_img1 from "./img/church_project_img1.jpg"
import church_project_img2 from "./img/church_project_img2.jpg"
import church_project_img3 from "./img/church_project_img3.jpg"
import church_project_video from "./img/church_project_video.mp4"

const GivingBuildingProject = () => {
    const [animated, setAnimated] = useState(false);
        
    useEffect(() => {
        setAnimated(true);
    }, []);
    
    return (
        <div className={`building-project ${animated ? 'animate' : ''}`}>
            <h2>Our Building Project</h2>
            
            <p className="project-description">
                We're expanding our facilities to serve our growing community. Any support towards this vision is greatly appreciated.
            </p>
            
            <div className="images-grid">
                <div className="main-image">
                    <video 
                        src={church_project_video}
                        autoPlay
                        muted
                        loop
                        poster={church_project_img1}
                        preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="image-overlay">
                        Building Project Video
                    </div>
                </div>
                
                <div className="secondary-images">
                    <div className="secondary-image">
                        <img 
                            src={church_project_img2} 
                            alt="Children's Area"
                        />
                    </div>
                    <div className="secondary-image">
                        <img 
                            src={church_project_img3} 
                            alt="Community Space"
                        />
                    </div>
                </div>
            </div>
            
            <div className="fund-notice">
                For building project donations, please add "Building Fund" in the reference
            </div>
        </div>
    )
}

export default GivingBuildingProject
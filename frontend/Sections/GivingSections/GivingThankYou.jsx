import React from 'react'
import { useState, useEffect } from 'react'
import './Giving.css'

const GivingThankYou = () => {
    const [animated, setAnimated] = useState(false);
        
    useEffect(() => {
        setAnimated(true);
    }, []);
    
    return (
        <div className={`giving-thank-you ${animated ? 'animate' : ''}`}>
            <h3>Thank You for Your Generosity</h3>
            <p>
                Your support enables us to continue sharing God's love in our community and beyond.
            </p>
        </div>
    )
}

export default GivingThankYou
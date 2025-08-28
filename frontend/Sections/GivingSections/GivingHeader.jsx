import React from 'react'
import { useState, useEffect } from 'react'
import './Giving.css'

const GivingHeader = () => {
    const [animated, setAnimated] = useState(false);
        
    useEffect(() => {
        setAnimated(true);
    }, []);
    
    return (
        <div className={`giving-header ${animated ? 'animate' : ''}`}>
            <h1>Generosity Changes Lives</h1>
            <div className="header-divider"></div>
        </div>
    )
}

export default GivingHeader
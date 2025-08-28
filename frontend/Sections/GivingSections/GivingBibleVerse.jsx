import React from 'react'
import { useState, useEffect } from 'react'
import './Giving.css'

const GivingBibleVerse = () => {
    const [animated, setAnimated] = useState(false);
        
    useEffect(() => {
        setAnimated(true);
    }, []);
    
    return (
        <div className={`giving-verse ${animated ? 'animate' : ''}`}>
            <blockquote>
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </blockquote>
            <p className="verse-reference">2 Corinthians 9:7</p>
        </div>
    )
}

export default GivingBibleVerse
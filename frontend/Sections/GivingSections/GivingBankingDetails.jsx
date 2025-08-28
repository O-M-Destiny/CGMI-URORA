import React from 'react'
import { useState, useEffect } from 'react';
import './Giving.css'

const GivingBankingDetails = () => {
    const [animated, setAnimated] = useState(false);
    
    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <div className={`banking-details ${animated ? 'animate' : ''}`}>
            <h2>Bank Transfer Details</h2>
            
            <div className="details-grid">
                <div className="detail-row">
                    <strong className="detail-label">Bank Name:</strong>
                    <span>Zenith Bank plc</span>
                </div>
                <div className="detail-row">
                    <strong className="detail-label">Account Name:</strong>
                    <span>Church Of God Mission Urora</span>
                </div>
                <div className="detail-row">
                    <strong className="detail-label">Account Number: </strong>
                    <span>1011294703</span>
                </div>
                <div className="detail-row">
                    <strong className="detail-label">Reference:</strong>
                    <span>Your Name + "Giving"</span>
                </div>
            </div>
        </div>
    )
}

export default GivingBankingDetails
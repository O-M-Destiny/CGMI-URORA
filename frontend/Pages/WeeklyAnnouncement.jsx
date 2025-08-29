import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/WeeklyAnnoucement.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WeeklyAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/public/fetch_annoucement?skip=0&limit=100`);
        setAnnouncements(response.data); 
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="weekly-announcement-container">
      <h2 className="weekly-announcement-title">
        Announcements for the Week
      </h2>
      <ul className="announcement-list">
        {announcements.map((item, index) => (
          <li key={item.id || index} className="announcement-item">
            <span className="announcement-number">{index + 1}</span>
            {item.annoucement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyAnnouncement;
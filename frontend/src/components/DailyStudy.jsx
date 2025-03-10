import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DailyStudy.css';

const DailyStudy = () => {
    const { date } = useParams();
    const [dailyStudyItems, setDailyStudyItems] = useState([]);

    useEffect(() => {
        const fetchDailyStudyItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/uploadDD/pdfs/${date}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch daily study items");
                }
                const data = await response.json();
                setDailyStudyItems(data.pdfs);
            } catch (error) {
                console.error("Error fetching daily study items:", error);
            }
        };

        fetchDailyStudyItems();
    }, [date]);

    if (dailyStudyItems.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="daily-study-container">
            <h1>Daily Study - {date}</h1>
            <div className="daily-study-list">
                {Object.keys(dailyStudyItems).map((language) => (
                    <div key={language} className="daily-study-language">
                        <h2>{language}</h2>
                        {dailyStudyItems[language].map((item, index) => (
                            <div key={index} className="daily-study-item">
                                <h3>{item.name}</h3>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">Download PDF</a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyStudy;
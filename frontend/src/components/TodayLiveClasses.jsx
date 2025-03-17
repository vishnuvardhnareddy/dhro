import React from 'react';
import './Courses.css'; // Reuse the CSS file for styling

function TodayLiveClasses() {
    return (
        <div className="courses-container">
            <h2 className="courses-heading">Today Live Classes</h2>
            <div className="cards-container">
                <p>No live classes scheduled for today.</p>
            </div>
        </div>
    );
}

export default TodayLiveClasses;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; // Reuse the CSS file for styling

function RecordedCourses() {
    const [offlineCourses, setOfflineCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOfflineCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/offlineCourses");
                if (!response.ok) {
                    throw new Error("Failed to fetch offline courses");
                }
                const data = await response.json();
                setOfflineCourses(data);
            } catch (error) {
                console.error("Error fetching offline courses:", error);
            }
        };

        fetchOfflineCourses();
    }, []);

    const handleCourseClick = (course) => {
        // Pass course data to the enroll page using navigate and state
        navigate('/enroll', { state: { course } });
    };

    return (
        <div className="courses-container">
            <h2 className="courses-heading">Recorded Courses</h2>
            <div className="cards-container">
                {offlineCourses.map((course) => (
                    <div key={course._id} className="card" onClick={() => handleCourseClick(course)}>
                        <img src={course.imageUrl} alt={course.title} className="card-image" />
                        <h3 className="card-title">{course.title}</h3>
                        <button className="explore-btn">Explore</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecordedCourses;

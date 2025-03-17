import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; // Reuse the CSS file for styling

function AllCourses() {
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const onlineResponse = await fetch("http://localhost:5000/api/onlineCourses");
                const offlineResponse = await fetch("http://localhost:5000/api/offlineCourses");

                if (!onlineResponse.ok || !offlineResponse.ok) {
                    throw new Error("Failed to fetch courses");
                }

                const onlineData = await onlineResponse.json();
                const offlineData = await offlineResponse.json();

                setAllCourses([...onlineData, ...offlineData]);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchAllCourses();
    }, []);

    const handleCourseClick = (course) => {
        // Pass course data to the enroll page using navigate and state
        navigate('/enroll', { state: { course } });
    };

    return (
        <div className="courses-container">
            <h2 className="courses-heading">All Courses</h2>
            <div className="cards-container">
                {allCourses.map((course) => (
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

export default AllCourses;

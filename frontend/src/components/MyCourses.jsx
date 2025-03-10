import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; // Reuse the CSS file for styling

function MyCourses() {
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/my-courses", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch my courses");
                }
                const data = await response.json();
                setMyCourses(data);
            } catch (error) {
                console.error("Error fetching my courses:", error);
            }
        };

        fetchMyCourses();
    }, []);

    const handleCourseClick = (courseId, type) => {
        navigate(`/course/${type}/${courseId}`);
    };

    return (
        <div className="courses-container">
            <h2 className="courses-heading">My Courses</h2>
            <div className="cards-container">
                {myCourses.map((course) => (
                    <div key={course._id} className="card" onClick={() => handleCourseClick(course._id, course.type)}>
                        <img src={course.imageUrl} alt={course.title} className="card-image" />
                        <h3 className="card-title">{course.title}</h3>
                        <p className="card-subtitle">{course.overview}</p>
                        <button className="explore-btn">Explore</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCourses;
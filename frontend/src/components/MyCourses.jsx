import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; // ✅ Reusing existing styles

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCourses = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to view your courses.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/users/me/courses", { // ✅ Fixed API route
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch courses. Status: ${response.status}`);
                }

                const data = await response.json();
                setMyCourses(data.courses || []); // ✅ Ensure correct data format
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load your courses. Please try again.");
            } finally {
                setLoading(false);
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

            {/* ✅ Show loading state */}
            {loading && <p className="loading-text">Loading courses...</p>}

            {/* ✅ Show error message if fetch fails */}
            {error && <p className="error-text">{error}</p>}

            {/* ✅ Show courses if available */}
            <div className="cards-container">
                {myCourses.length > 0 ? (
                    myCourses.map((course) => (
                        <div key={course._id} className="card" onClick={() => handleCourseClick(course._id, course.type)}>
                            <img src={course.imgUrl || "/placeholder.jpg"} alt={course.title} className="card-image" />
                            <h3 className="card-title">{course.title}</h3>
                           
                            <button className="explore-btn">Explore</button>
                        </div>
                    ))
                ) : (
                    !loading && <p className="no-courses-text">You have no courses yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyCourses;

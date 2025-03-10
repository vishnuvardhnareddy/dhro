import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
    const { type, courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/${type === 'online' ? 'onlineCourses' : 'offlineCourses'}/${courseId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch course details");
                }
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourse();
    }, [type, courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-detail-container">
            <h1>{course.title}</h1>
            <img src={course.imageUrl} alt={course.title} className="course-image" />
            <p>{course.overview}</p>
            <p>{course.details}</p>
            <p>Price: ${course.price}</p>
            {course.discountedPrice && <p>Discounted Price: ${course.discountedPrice}</p>}
            <button onClick={() => window.location.href = course.paymentLink}>Enroll Now</button>
        </div>
    );
};

export default CourseDetail;
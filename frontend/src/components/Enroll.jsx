import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Enroll.css';

const OnlineCourseRegistration = () => {
    const location = useLocation();
    const course = location.state?.course || {};  // Get the course details passed from the previous page
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Ref for the registration section
    const registrationSectionRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/auth"); // Redirect to login if no token is found
        }

        // Scroll to the registration section when the component mounts
        if (registrationSectionRef.current) {
            registrationSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [navigate]);

    const handleBuyNow = async () => {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        if (!token) {
            setError("You must be logged in to enroll in a course.");
            return;
        }

        const courseData = {
            title: course.title,
            imgUrl: course.imageUrl, // Assuming the course object has this property
        };

        try {
            // Send course data to the backend with the token in Authorization header
            const response = await axios.put(
                `http://localhost:5000/api/users/me/add-course`,
                courseData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );

            // Log the response (you can also perform any additional actions here)
            console.log('Course added successfully:', response.data);

            // Display an alert for successful course addition
            alert("Course added successfully!");

            // Optionally, navigate to another page or show a success message
            // For example, you could redirect the user to their profile or home page:
            // navigate("/profile");

        } catch (error) {
            // Error handling
            if (error.response) {
                setError(error.response.data.error || "Error adding course");
            } else {
                setError("An unexpected error occurred.");
            }
            console.error('Error adding course:', error);
        }
    };

    return (
        <>
            <h2>Booking Section:</h2>
            <div className="body">
                <div className="form" ref={registrationSectionRef}>
                    <div className="registration-form">
                        <h2>Register for {course.title}</h2>  {/* Display course title */}
                        <h3>Price: {course.price}</h3>  {/* Display course price */}

                      

                        <button className="buy-button" onClick={handleBuyNow}>
                            EnrollNow
                        </button>

                        {/* Display any error if there is one */}
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnlineCourseRegistration;

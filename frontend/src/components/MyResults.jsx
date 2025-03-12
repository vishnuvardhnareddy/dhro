import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyResults = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");

        // ✅ Redirect if userId is missing or invalid
        if (!storedUserId || storedUserId === "null") {
            console.error("❌ Invalid User ID. Redirecting to login.");
            alert("Session expired. Please log in again.");
            navigate("/auth");
            return;
        }

        console.log("Fetching results for User ID:", storedUserId); // ✅ Debugging

        const fetchResult = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/results/${storedUserId}`);
                const data = await response.json();
                console.log("Fetched Result:", data); // ✅ Debugging

                if (response.ok && data.results.length > 0) {
                    setResult(data.results[0]);
                } else {
                    setError("No results found.");
                }
            } catch (error) {
                console.error("❌ Error fetching results:", error);
                setError("Error loading results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [navigate]);

    if (loading) return <p>Loading results...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Test Results</h2>
            <p>Score: {result.obtainedMarks} / {result.totalMarks}</p>
        </div>
    );
};

export default MyResults;

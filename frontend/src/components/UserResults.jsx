import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserResults = () => {
    const { userId } = useParams();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/results/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setResults(response.data);
            } catch (err) {
                setError("Failed to fetch results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="results-container">
            <h2>Your Test Results</h2>
            <p>Total Questions: {results.totalMarks}</p>
            <p>Correct Answers: {results.obtainedMarks}</p>
            <h3>Your Answers:</h3>
            <ul>
                {Object.entries(results.answers).map(([qIndex, answer], idx) => (
                    <li key={idx}>Question {parseInt(qIndex) + 1}: {answer}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserResults;

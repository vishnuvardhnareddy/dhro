import React, { useState, useEffect } from "react";
import "./MyResults.css"; // ✅ Ensure proper styling

const MyResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to view your results.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/testseries/results", {
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) throw new Error(`Failed to fetch results. Status: ${response.status}`);

                const data = await response.json();
                setResults(data.data || []);
            } catch (error) {
                console.error("Error fetching results:", error);
                setError("Failed to load results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    return (
        <div className="results-container">
            <h2>My Test Results</h2>

            {loading && <p>Loading results...</p>}
            {error && <p className="error-text">{error}</p>}

            <table className="results-table">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.testId.title}</td>
                                <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                                <td>{result.score}</td>
                            </tr>
                        ))
                    ) : (
                        !loading && <tr><td colSpan="3">No results found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyResults;

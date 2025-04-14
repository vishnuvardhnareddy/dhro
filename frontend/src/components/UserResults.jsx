import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserResults = () => {
    const { userId } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("token", userId);

                const response = await axios.get(`http://localhost:5000/api/results/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                console.log(response.data.data);
                setResults(response.data.data || []);
            } catch (err) {
                console.error(err);
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
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                results.map((result, index) => (
                    <div
                        key={result._id || index}
                        className="result-card"
                        style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ccc" }}
                    >
                        <h3>{result.mockTestId?.title || `Test ${index + 1}`}</h3>
                        <p><strong>Total Marks:</strong> {result.totalMarks}</p>
                        <p><strong>Score:</strong> {result.score}</p>

                        <h4>Your Answers:</h4>
                        <ul>
                            {result.answers.map((answerObj, i) => {
                                const question = result.mockTestId?.questions?.find(
                                    q => q._id === answerObj.questionId
                                );

                                return (
                                    <li key={i} style={{ marginBottom: "10px" }}>
                                        <p><strong>Q{i + 1}:</strong> {question?.questionText}</p>
                                        <p><strong>Your Answer:</strong> {answerObj.selectedOption}</p>
                                        <p style={{ color: answerObj.isCorrect ? "green" : "red" }}>
                                            <strong>{answerObj.isCorrect ? "Correct ✅" : "Incorrect ❌"}</strong>
                                        </p>
                                        {!answerObj.isCorrect && (
                                            <p><strong>Correct Answer:</strong> {question?.correctAnswer}</p>
                                        )}
                                        <hr />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserResults;

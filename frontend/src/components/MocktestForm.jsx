import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MockTestForm.css"; // ✅ Ensure correct styling

const MockTestForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to take this test.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/testseries/mocktests/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) throw new Error(`Failed to fetch questions. Status: ${response.status}`);

                const data = await response.json();
                console.log("Fetched Questions:", data); // ✅ Debugging API Response

                setQuestions(data.data.questions || []);
                setTimer(data.data.duration * 60); // ✅ Convert minutes to seconds
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError("Failed to load the test. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    const handleOptionChange = (qIndex, option) => {
        setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    };

    const submitTest = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/testseries/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ testId: id, answers }),
            });

            const result = await response.json();
            if (result.success) navigate(`/results/${id}`);
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };

    return (
        <div className="mock-test-container">
            <h1>Mock Test</h1>

            {loading && <p className="loading-text">Loading test...</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && !error && (
                <>
                    <p className="timer">Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>

                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={index} className="question-card">
                                <h2>{index + 1}. {question.questionText}</h2>
                                <ul className="options-list">
                                    {question.options.map((option, idx) => (
                                        <li key={idx} className="option">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    onChange={() => handleOptionChange(index, option)}
                                                />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="no-questions-text">No questions available for this test.</p>
                    )}

                    <button className="submit-btn" onClick={submitTest}>Submit Test</button>
                </>
            )}
        </div>
    );
};

export default MockTestForm;

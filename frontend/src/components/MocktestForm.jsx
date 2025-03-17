import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./MockTestForm.css";

const MockTestForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(0);
    const [username, setUsername] = useState("");
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");

            if (!token) {
                setError("You must be logged in to take this test.");
                setLoading(false);
                return;
            }
            if (storedUsername) {
                setUsername(storedUsername);
            }

            try {
                const response = await fetch(`http://localhost:5000/api/testseries/mocktests/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) throw new Error(`Failed to fetch questions. Status: ${response.status}`);

                const data = await response.json();
                setQuestions(data.data.questions || []);
                setTimer(data.data.duration * 60);
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

    const handleOptionChange = (option) => {
        setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const jumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const submitTest = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        try {
            const response = await axios.post("http://localhost:5000/api/results/submit",
                {
                    userId,
                    testId: id,
                    totalMarks: questions.length,
                    obtainedMarks: calculateScore(),
                    answers
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (response.data.message) {
                navigate(`/results/${userId}`);
            }
        } catch (error) {
            console.error("Error submitting test:", error);
        }

    };

    return (
        <div className="mock-test-container">
            <div className="test-content">
                <h1>Mock Test</h1>
                {loading && <p className="loading-text">Loading test...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && !error && questions.length > 0 && (
                    <>
                        <p className="timer">Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                        <div className="question-card">
                            <h2>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].questionText}</h2>
                            <ul className="options-list">
                                {questions[currentQuestionIndex].options.map((option, idx) => (
                                    <li
                                        key={idx}
                                        className={`option ${answers[currentQuestionIndex] === option ? "selected" : ""}`}
                                        onClick={() => handleOptionChange(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="nav-buttons">
                            <button className="nav-btn" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                            <button className="nav-btn" onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                        </div>
                    </>
                )}
            </div>
            <div className="question-box">
                <div className="user-profile">
                    <FaUserCircle className="profile-icon" />
                    <span className="username">{name || "Guest"}</span>
                </div>
                <h3>Questions</h3>
                <ul className="question-list">
                    {questions.map((_, index) => (
                        <li key={index} className={index === currentQuestionIndex ? "active" : ""} onClick={() => jumpToQuestion(index)}>
                            {index + 1}
                        </li>
                    ))}
                </ul>
                <div className="instructions-container">
                    <button className="instructions-btn" onClick={() => setShowInstructions(!showInstructions)}>Instructions</button>
                    {showInstructions && (
                        <div className="instructions-box">
                            <p>📌 **Instructions:**</p>
                            <ul>
                                <li>Each question has four options.</li>
                                <li>Click anywhere on an option to select it.</li>
                                <li>Use the "Next" and "Previous" buttons to navigate.</li>
                                <li>Click on a question number to jump directly.</li>
                                <li>Ensure all questions are answered before submission.</li>
                            </ul>
                        </div>
                    )}
                </div>
                <button className="submit-btn" onClick={submitTest}>Submit Test</button>
            </div>
        </div>
    );
};

export default MockTestForm;

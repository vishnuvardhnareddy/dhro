import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TestPage.css";

const TestPage = () => {
    const { testId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/testseries/mocktests/${testId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const data = await response.json();
                setQuestions(data.data.questions);
                setStartTime(new Date());
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        const checkLogin = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/auth");
            }
        };

        checkLogin();
        fetchQuestions();
    }, [testId, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmitTest();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitTest = async () => {
        setEndTime(new Date());
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/testseries/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                testId,
                answers,
                startTime,
                endTime
            })
        });

        if (response.ok) {
            navigate("/");
        } else {
            console.error("Failed to submit test");
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="test-page-container">
            <div className="test-header">
                <h1>{currentQuestion.mockTest}</h1>
                <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            </div>
            <div className="question-container">
                <h2>{currentQuestionIndex + 1}. {currentQuestion.questionText}</h2>
                <div className="options">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={answers[currentQuestionIndex] === option}
                                onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                <button onClick={handleSubmitTest}>Submit Test</button>
            </div>
        </div>
    );
};

export default TestPage;
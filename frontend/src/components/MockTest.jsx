import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MockTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (!user) {
            navigate("/auth");
        } else {
            setIsLoggedIn(true);
        }

        // Fetch questions from API
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/testseries/mocktests/${testId}`);
                if (!response.ok) throw new Error("Failed to fetch questions");
                const data = await response.json();
                setQuestions(data.data.questions);
                setTimer(data.data.duration * 60); // Convert minutes to seconds
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [testId, navigate]);

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
            const response = await fetch("http://localhost:5000/api/testseries/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify({ testId, answers, startTime: new Date(), endTime: new Date() }),
            });
            const result = await response.json();
            if (result.success) navigate(`/results/${testId}`);
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div>
            <h1>Mock Test</h1>
            <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
            {questions.map((question, index) => (
                <div key={index}>
                    <h2>{question.questionText}</h2>
                    <ul>
                        {question.options.map((option, idx) => (
                            <li key={idx}>
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
            ))}
            <button onClick={submitTest}>Submit Test</button>
        </div>
    );
};

export default MockTest;

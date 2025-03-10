import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MockTests.css";

const MockTests = () => {
    const { subCategoryId } = useParams();
    const [mockTests, setMockTests] = useState([]);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/mocktestForm/${id}`);
    };

    useEffect(() => {
        const fetchMockTests = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/testseries/subcategories/${subCategoryId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch mock tests");
                }
                const data = await response.json();
                setMockTests(data.data.mockTests);
            } catch (error) {
                console.error("Error fetching mock tests:", error);
            }
        };

        fetchMockTests();
    }, [subCategoryId, navigate]);

    return (
        <div className="mock-tests-container">
            <h1>Mock Tests</h1>
            <div className="mock-tests-list">
                {mockTests.map((mockTest) => (
                    <div key={mockTest._id} className="mock-test-item">
                        <h2>{mockTest.title}</h2>
                        <p>{mockTest.description}</p>
                        <button onClick={() => handleClick(mockTest._id)}>Start Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MockTests;
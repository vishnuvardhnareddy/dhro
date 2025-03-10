import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DD.css"; // Import the updated CSS file

const DailyDose = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [language, setLanguage] = useState("English");
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const languages = ["English", "Hindi", "Bengali"];

    useEffect(() => {
        if (!date) return;
        fetchPdfs();
    }, [date, language]);

    const fetchPdfs = async () => {
        setLoading(true);
        setError("");
        setPdfs([]); // Reset PDFs before fetching

        try {
            const apiUrl = `http://localhost:5000/uploadDD/pdfs/${date}/${language}`;
            console.log("Fetching from:", apiUrl);
            const response = await axios.get(apiUrl);

            console.log("API Response Data:", response.data);

            if (!Array.isArray(response.data) || response.data.length === 0) {
                setError("No PDFs found for the selected date.");
                return;
            }

            setPdfs(response.data);
        } catch (err) {
            console.error("API Error:", err);
            setError("Failed to fetch PDFs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle download function
    const handleDownload = (pdfUrl) => {
        if (!pdfUrl) {
            alert("PDF is not available for download.");
            return;
        }

        // Open in a new tab
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="daily-dose-container">
            <h2>Daily Dose</h2>

            {/* Date Selection */}
            <div className="date-picker">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Language Tabs */}
            <div className="language-tabs">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        className={language === lang ? "active" : ""}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default page reload
                            setLanguage(lang);
                        }}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Show PDFs */}
            {loading ? (
                <p>Loading PDFs...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="pdf-grid">
                    {pdfs.length === 0 ? (
                        <p>No PDFs available.</p>
                    ) : (
                        pdfs.map((pdf, index) => (
                            <div key={index} className="pdf-card">
                                <h3 className="category-title">{pdf.title || "Category"}</h3>

                                {pdf.url ? (
                                    <button
                                        className="download-button"
                                        onClick={() => handleDownload(pdf.url)}
                                    >
                                        Download
                                    </button>
                                ) : (
                                    <p className="coming-soon">Will be uploaded soon</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DailyDose;

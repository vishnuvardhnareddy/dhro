import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CA.css";

const CurrentAffairs = () => {
    const [selectedDate, setSelectedDate] = useState("2025-03-05");
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/ca?date=${selectedDate}`);
                const data = await response.json();
                console.log("Fetched API Data:", data); // Debugging

                if (data && Array.isArray(data.affairs)) {
                    setNewsData(data.affairs);
                } else {
                    console.error("Unexpected API response format:", data);
                    setNewsData([]);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [selectedDate]);

    const handleDateChange = (day) => {
        setSelectedDate(`2025-03-${String(day).padStart(2, "0")}`);
    };

    const handleReadMore = (news) => {
        setSelectedNews(news);
        setTimeout(() => {
            document.getElementById("news-details").scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="news-container">
            {/* Date Selector */}
            <div className="date-selector">
                <select>
                    <option>March</option>
                </select>
                <select>
                    <option>2025</option>
                </select>
            </div>

            {/* Date Scroller */}
            <div className="date-scroller">
                <FaChevronLeft className="icon" onClick={() => handleDateChange(Math.max(1, parseInt(selectedDate.split("-")[2]) - 1))} />
                <div className="date-buttons">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <button
                            key={day}
                            className={`date-btn ${selectedDate === `2025-03-${String(day).padStart(2, "0")}` ? "active" : ""}`}
                            onClick={() => handleDateChange(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <FaChevronRight className="icon" onClick={() => handleDateChange(Math.min(31, parseInt(selectedDate.split("-")[2]) + 1))} />
            </div>

            {/* News Cards */}
            <div className="news-grid">
                {newsData.length > 0 ? (
                    newsData.map((news, index) => (
                        <div key={index} className="news-card">
                            <h3 className="news-title">{news.title}</h3>
                            <button className="read-more" onClick={() => handleReadMore(news)}>Read More</button>
                        </div>
                    ))
                ) : (
                    <p>No news available for this date.</p>
                )}
            </div>

            {/* News Details Section */}
            {selectedNews && (
                <div id="news-details" className="news-details">
                    <h2>{selectedNews.title}</h2>
                    <p><strong>Date:</strong> {selectedNews.date}</p>
                    <img src={selectedNews.img} alt="News" className="news-image" />
                    <p>{selectedNews.data}</p>
                    <h3>Key Points:</h3>
                    <ul>
                        {selectedNews.keyPoints.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrentAffairs;

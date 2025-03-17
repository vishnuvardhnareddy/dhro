import React from "react";

const Personalized = () => {
    return (
        <div className="p">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "auto",
                    padding: "20px",
                    background: "transparent",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                        margin: "10px",
                        padding: "40px",
                        borderRadius: "15px",
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #8E44AD, #3498DB, #E91E63)",
                        animation: "gradientBG 8s ease infinite alternate",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Left Image */}
                    <div style={{ width: "25%", minWidth: "180px", textAlign: "center" }}>
                        <img
                            src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Fteam%2Ffaculty_group_left.webp&w=750&q=75"
                            alt="Left Team"
                            style={{ width: "100%", maxWidth: "220px", height: "auto" }}
                        />
                    </div>

                    {/* Form Section */}
                    <div style={{ flex: 1, textAlign: "center", padding: "10px", minWidth: "250px" }}>
                        <h2
                            style={{
                                margin: "0",
                                fontSize: "34px",
                                fontWeight: "bold",
                                color: "#ffffff",
                                letterSpacing: "1px",
                            }}
                        >
                            PERSONALIZED
                        </h2>

                        {/* Scrolling Text Animation */}
                        <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%", margin: "5px 0" }}>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#FFD700",
                                    animation: "scrollText 10s linear infinite",
                                }}
                            >
                                Practice | Coaching | Study Material | Practice | Coaching | Study Material |
                            </p>
                        </div>

                        {/* Input Field */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                marginTop: "5px",
                            }}
                        >
                            <input
                                type="tel"
                                placeholder="Enter Mobile Number"
                                style={{
                                    padding: "12px",
                                    border: "2px solid #ffffff",
                                    borderRadius: "5px 0 0 5px",
                                    width: "70%",
                                    maxWidth: "300px",
                                    fontSize: "16px",
                                    outline: "none",
                                    background: "rgba(255, 255, 255, 0.1)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                            <button
                                style={{
                                    padding: "12px 18px",
                                    background: "linear-gradient(90deg, #FF6B6B, #FF8C00)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0 5px 5px 0",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    transition: "0.3s",
                                }}
                            >
                                ➤
                            </button>
                        </div>

                        {/* Google Play Store Button */}
                        <div style={{ marginTop: "5px" }}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
                                alt="Get it on Google Play"
                                style={{ width: "160px", cursor: "pointer" }}
                            />
                        </div>
                    </div>

                    {/* Right Image */}
                    <div style={{ width: "25%", minWidth: "180px", textAlign: "center" }}>
                        <img
                            src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Fteam%2Ffaculty_group_right.webp&w=750&q=75"
                            alt="Right Team"
                            style={{ width: "100%", maxWidth: "220px", height: "auto" }}
                        />
                    </div>
                </div>

                {/* Animations */}
                <style>
                    {`
          @media (max-width: 768px) {
            .p {
              padding: 10px;
            }
          }
          @keyframes scrollText {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }

          @keyframes gradientBG {
            0% { background: linear-gradient(135deg, #8E44AD, #3498DB, #E91E63); }
            50% { background: linear-gradient(135deg, #6A0572, #2980B9, #C2185B); }
            100% { background: linear-gradient(135deg, #8E44AD, #3498DB, #E91E63); }
          }

          input::placeholder {
            color: white;
          }
        `}
                </style>
            </div>
        </div>
    );
};

export default Personalized;

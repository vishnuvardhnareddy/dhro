import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Ensure you have a CSS file for styling

const AuthPage = () => {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrPhone, password })
            });

            const data = await response.json();
            console.log("Login Response:", data);

            if (response.ok && data.token && data.userId) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);  // ✅ Ensure userId is stored
                localStorage.setItem("username", data.name);
                navigate("/");
            } else {
                alert(data.message || "Login failed. Check your credentials.");
            }
        } catch (error) {
            console.error("❌ Login Error:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email or Phone:</label>
                    <input
                        type="text"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="Enter your email or phone"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default AuthPage;

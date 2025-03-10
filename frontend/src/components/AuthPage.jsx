import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(isLogin ? "Login failed" : "Registration failed");
            }

            const data = await response.json();
            if (isLogin) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Login" : "Register"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleAuth}>
                    <div className="auth-section">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-section">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="nav-button login-btn">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                    {isLogin ? "Switch to Register" : "Switch to Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
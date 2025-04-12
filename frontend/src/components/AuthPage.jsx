import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
            const payload = isLogin
                ? { emailOrPhone: formData.email || formData.phone, password: formData.password }
                : formData;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || (isLogin ? "Login failed" : "Registration failed"));
            }

            if (isLogin) {
                console.log(data);

                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.name);
                localStorage.setItem("userId", data.userId);
                navigate("/");
                window.location.reload();
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
                <form onSubmit={handleAuth}>
                    <h2>{isLogin ? "Login" : "Register"}</h2>
                    {error && <p className="error">{error}</p>}
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isLogin ? "Login" : "Register"}</button>
                    <button type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Switch to Register" : "Switch to Login"}
                    </button>
                </form>
                {isAuthenticated && (
                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("name");
                            navigate("/auth");
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
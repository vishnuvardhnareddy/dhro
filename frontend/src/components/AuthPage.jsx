import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        emailOrPhone: "",
        phone: "",
        password: "",
        // Removed state and city fields
    });
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(isLogin ? "Login failed" : "Registration failed");
            }

            const data = await response.json();
            if (isLogin) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.name);
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
                    {!isLogin && (
                        <>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

                            {/* Removed state and city selection */}
                        </>
                    )}
                    <input
                        type="text"
                        name="emailOrPhone"
                        placeholder={isLogin ? "Email or Phone" : "Email"}
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        required
                    />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">{isLogin ? "Login" : "Register"}</button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Switch to Register" : "Switch to Login"}</button>
            </div>
        </div>
    );
};

export default AuthPage;
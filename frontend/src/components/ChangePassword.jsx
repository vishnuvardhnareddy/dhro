import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const token = localStorage.getItem('token');
        await axios.put('http://localhost:5000/api/users/me/change-password',
            { password: passwordData.newPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Password updated successfully');
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="change-btn">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;

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
        await axios.put('http://localhost:5000/api/users/change-password', { password: passwordData.newPassword }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Password updated successfully');
    };

    return (
        <div className="change-password-container">
            <h1>Change Your Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter your new password</label>
                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ChangePassword;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfileData(response.data.data);
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.put('http://localhost:5000/api/users/me', profileData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Profile updated successfully');
    };

    return (
        <div className="profile-container">
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={profileData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={profileData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={profileData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={profileData.address} onChange={handleChange} required />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Profile;

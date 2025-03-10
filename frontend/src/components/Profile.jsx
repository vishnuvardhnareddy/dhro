import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={profileData.name} readOnly />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" value={profileData.email} readOnly />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" value={profileData.phone} readOnly />
            </div>
        </div>
    );
};

export default Profile;

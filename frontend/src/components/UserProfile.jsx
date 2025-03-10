import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }

    return (
        <div className="user-profile-container">
            <h1>User Profile</h1>
            <div className="user-profile-details">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={userData.name} readOnly />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={userData.email} readOnly />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" value={userData.phone} readOnly />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
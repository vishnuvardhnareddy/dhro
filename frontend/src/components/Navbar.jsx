import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaUser, FaBars } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const [isTestSeriesDropdownOpen, setIsTestSeriesDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        if (token) {
            fetchUserData();
        }
        fetchCategories();
    }, []);

    // Fetch categories (Test Series)
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/testseries/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch logged-in user data
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    // Toggle functions
    const toggleDropdown = (setter) => {
        setIsMenuDropdownOpen(false);
        setIsTestSeriesDropdownOpen(false);
        setIsProfileDropdownOpen(false);
        setter((prev) => !prev);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo" onClick={() => navigate("/")}>
                <img
                    src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Flogo.png&w=256&q=75"
                    alt="logo"
                />
            </div>

            {/* Mobile Menu */}
            <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <FaBars className="icon" />
            </div>

            {/* Main Menu */}
            <div className={`menu ${isMobileMenuOpen ? "active" : ""}`}>
                {isAuthenticated ? (
                    <>
                        {/* Courses Dropdown */}
                        <div className="dropdown">
                            <span className="dropdown-title" onClick={() => toggleDropdown(setIsMenuDropdownOpen)}>
                                Courses <FaChevronDown className="dropdown-icon" />
                            </span>
                            {isMenuDropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => navigate("/my-courses")}>My Courses</li>
                                    <li className="dropdown-item" onClick={() => navigate("/today-live-classes")}>Today Live Classes</li>
                                    <li className="dropdown-item" onClick={() => navigate("/live-courses")}>Live Courses</li>
                                    <li className="dropdown-item" onClick={() => navigate("/recorded-courses")}>Recorded Courses</li>
                                    <li className="dropdown-item" onClick={() => navigate("/all-courses")}>All Courses</li>
                                </ul>
                            )}
                        </div>

                        {/* Test Series Dropdown */}
                        <div className="dropdown">
                            <span className="dropdown-title" onClick={() => toggleDropdown(setIsTestSeriesDropdownOpen)}>
                                Test Series <FaChevronDown className="dropdown-icon" />
                            </span>
                            {isTestSeriesDropdownOpen && (
                                <ul className="dropdown-menu">
                                    {categories.map((category) => (
                                        <li
                                            key={category._id}
                                            className="dropdown-item"
                                            onMouseEnter={() => setHoveredCategory(category._id)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            {category.name} {category.subCategories?.length > 0 && <FaChevronDown className="sub-dropdown-icon" />}
                                            {hoveredCategory === category._id && category.subCategories?.length > 0 && (
                                                <ul className="sub-dropdown">
                                                    {category.subCategories.map((sub) => (
                                                        <li key={sub._id} className="sub-item" onClick={() => navigate(`/testseries/${sub._id}`)}>
                                                            {sub.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Navigation for Non-Authenticated Users */}
                        <div className="dropdown" onClick={() => navigate("/about-us")}>
                            <span className="dropdown-title">About Us</span>
                        </div>

                        <div className="dropdown" onClick={() => navigate("/contact-us")}>
                            <span className="dropdown-title">Contact Us</span>
                        </div>
                    </>
                )}
            </div>

            {/* Profile/Login Section */}
            <div className="login-register">
                {isAuthenticated ? (
                    <div className="profile-dropdown">
                        <button className="profile-button" onClick={() => toggleDropdown(setIsProfileDropdownOpen)}>
                            {userData?.name} <FaUser className="icon" /> <FaChevronDown className="dropdown-icon" />
                        </button>
                        {isProfileDropdownOpen && (
                            <ul className="profile-dropdown-menu">
                                <li className="profile-item" onClick={() => navigate("/profile")}>My Profile</li>
                                <li className="profile-item" onClick={() => navigate("/orders")}>My Orders</li>
                                <li className="profile-item" onClick={() => navigate("/address")}>Your Address</li>
                                <li className="profile-item" onClick={() => navigate("/cart")}>Cart</li>
                                <li className="profile-item" onClick={() => navigate("/change-password")}>Change Password</li>
                                <li className="profile-item logout" onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <button className="login-btn" onClick={() => navigate("/auth")}>
                        <FaUser className="icon" /> Login/Register
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

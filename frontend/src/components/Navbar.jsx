import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaUser, FaBars } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isTestSeriesDropdownOpen, setIsTestSeriesDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [isDailyStudyDropdownOpen, setIsDailyStudyDropdownOpen] = useState(false);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        if (token) {
            fetchUserData();
        }
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/testseries/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleCategoryHover = (categoryId) => {
        setHoveredCategory(categoryId);
    };

    const handleSubCategoryClick = (subCategory) => {
        navigate(`/testseries/${subCategory._id}`);
    };

    const handleLogin = () => {
        navigate("/auth");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    const handleTestSeriesDropdownClick = () => {
        setIsTestSeriesDropdownOpen(!isTestSeriesDropdownOpen);
        setIsDailyStudyDropdownOpen(false);
        setIsMenuDropdownOpen(false);
    };

    const handleDailyStudyDropdownClick = () => {
        setIsDailyStudyDropdownOpen(!isDailyStudyDropdownOpen);
        setIsTestSeriesDropdownOpen(false);
        setIsMenuDropdownOpen(false);
    };

    const handleMenuDropdownClick = () => {
        setIsMenuDropdownOpen(!isMenuDropdownOpen);
        setIsTestSeriesDropdownOpen(false);
        setIsDailyStudyDropdownOpen(false);
    };

    const handleProfileDropdownClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
                <img
                    src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Flogo.png&w=256&q=75"
                    alt="logo"
                />
            </div>

            <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <FaBars className="icon" />
            </div>

            <div className={`menu ${isMobileMenuOpen ? "active" : ""}`}>
                {isAuthenticated ? (
                    <>
                        <div className="dropdown">
                            <span className="dropdown-title" onClick={() => handleMenuDropdownClick()}>
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
                    </>
                ) : (
                    <>
                        <div className="dropdown" onClick={handleTestSeriesDropdownClick} ref={dropdownRef}>
                            <span className="dropdown-title">
                                Test Series <FaChevronDown className="dropdown-icon" />
                            </span>
                            {isTestSeriesDropdownOpen && (
                                <ul className="dropdown-menu">
                                    {categories.map((category) => (
                                        <li
                                            key={category._id}
                                            className="dropdown-item"
                                            onMouseEnter={() => handleCategoryHover(category._id)}
                                            onMouseLeave={() => handleCategoryHover(null)}
                                        >
                                            {category.name} {category.subCategories?.length > 0 && <FaChevronDown className="sub-dropdown-icon" />}
                                            {hoveredCategory === category._id && category.subCategories?.length > 0 && (
                                                <ul className="sub-dropdown">
                                                    {category.subCategories.map((sub) => (
                                                        <li key={sub._id} className="sub-item" onClick={() => handleSubCategoryClick(sub)}>
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

                        <div className="dropdown" onClick={handleDailyStudyDropdownClick}>
                            <span className="dropdown-title">
                                Daily Study <FaChevronDown className="dropdown-icon" />
                            </span>
                            {isDailyStudyDropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => navigate("/daily-study/books")}>Books</li>
                                    <li className="dropdown-item" onClick={() => navigate("/daily-study/daily-dose")}>Daily Dose</li>
                                    <li className="dropdown-item" onClick={() => navigate("/daily-study/current-affairs")}>Current Affairs</li>
                                </ul>
                            )}
                        </div>

                        <div className="dropdown" onClick={() => navigate("/online-courses")}>
                            <span className="dropdown-title">
                                Online Courses
                            </span>
                        </div>

                        <div className="dropdown" onClick={() => navigate("/about-us")}>
                            <span className="dropdown-title">
                                About Us
                            </span>
                        </div>

                        <div className="dropdown" onClick={() => navigate("/contact-us")}>
                            <span className="dropdown-title">
                                Contact Us
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="login-register">
                {isAuthenticated ? (
                    <div className="profile-dropdown">
                        <button className="profile-button" onClick={handleProfileDropdownClick}>
                            {userData?.name} <FaChevronDown className="dropdown-icon" />
                        </button>
                        {isProfileDropdownOpen && (
                            <div className="profile-dropdown-menu">
                                <div className="user-info">
                                    {userData?.email}
                                </div>
                                <button className="view-profile-button" onClick={() => navigate("/profile")}>
                                    View Profile
                                </button>
                                <ul className="profile-links">
                                    <li onClick={() => navigate("/profile")}>My Profile</li>
                                    <li onClick={() => navigate("/orders")}>My Orders</li>
                                    <li onClick={() => navigate("/address")}>Your Address</li>
                                    <li onClick={() => navigate("/cart")}>Cart</li>
                                    <li onClick={() => navigate("/change-password")}>Change Password</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={handleLogin}>
                        <FaUser className="icon" /> Login/Register
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

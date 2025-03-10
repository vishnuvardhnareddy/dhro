import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaQuestionCircle, FaUser, FaBars } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isTestSeriesDropdownOpen, setIsTestSeriesDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsTestSeriesDropdownOpen(false);
                setHoveredCategory(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategoryHover = (categoryId) => {
        setHoveredCategory(categoryId);
    };

    const handleSubCategoryClick = (subCategory) => {
        navigate(`/testseries/${subCategory._id}`);
    };

    const handleLogin = () => {
        navigate("/auth");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img
                    src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Flogo.png&w=256&q=75"
                    alt="logo"
                />
            </div>

            <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <FaBars className="icon" />
            </div>

            <div className={`menu ${isMobileMenuOpen ? "active" : ""}`}>
                <div
                    className="dropdown"
                    onMouseEnter={() => setIsTestSeriesDropdownOpen(true)}
                    onMouseLeave={() => setIsTestSeriesDropdownOpen(false)}
                    ref={dropdownRef}
                >
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

                <div className="question-answers">
                    <button>
                        <FaQuestionCircle className="icon" /> Question Answers
                    </button>
                </div>

                <div className="google-play">
                    <a href="#">
                        <img
                            src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Fsocial-media%2Fplaystore_icon.png&w=640&q=75"
                            alt="Google Play"
                        />
                    </a>
                </div>
            </div>

            <div className="login-register">
                <button onClick={handleLogin}>
                    <FaUser className="icon" /> Login/Register
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
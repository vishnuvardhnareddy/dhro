import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaArrowUp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setShowScroll(window.scrollY > 300);
        };
        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo & Description */}
                <div className="footer-section footer-about">
                    <img
                        src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Flogo.png&w=256&q=75"
                        alt="Dhronas Logo"
                        className="footer-logo"
                    />
                    <p>
                        We understand that every student has different needs and capabilities, which is why we create a unique and structured curriculum to help every student succeed.
                    </p>
                </div>

                {/* Links Sections */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Gallery</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Policies</h4>
                    <ul>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Shipping</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Live Chat</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                </div>

                {/* Contact & Social Media */}
                <div className="footer-section footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: <a href="mailto:thedhronasofficial@gmail.com">thedhronasofficial@gmail.com</a></p>
                    <p>Phone: <span>+91-8436900456</span></p>

                    {/* Social Media Icons */}
                    <div className="footer-social">
                        <a href="#" className="social-icon"><FaFacebookF /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaYoutube /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription */}

            {/* Google Play Store Button */}
            <div className="footer-playstore">
                <a href="#" target="_blank">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
                        alt="Google Play"
                    />
                </a>
            </div>
            
        </footer>
    );
};

export default Footer;

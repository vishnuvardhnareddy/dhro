import React from 'react';
import './Contactus.css'; // Import the CSS file

function Contactus() {
    return (
        <div className="contactus-container">
            <h1 className="contactus-title">Contact Us</h1>
            <p className="contactus-subtitle">Get in touch</p>
            <p className="contactus-description">
                Get in touch with us by filling out the contact form below.
            </p>

            <div className="contactus-content">
                {/* Contact Form */}
                <div className="contact-form">
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Enter Email" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" placeholder="Enter Mobile Number" required />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Enter Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="contact-info">
                    <h2 className="info-title">Contact Information</h2>
                    <div className="info-item">
                        <h3>Address:</h3>
                        <p>
                            Flat No. 43, AT Mukherjee Road, Near SBI ATM, College Para, Siliguri, Darjeeling, West Bengal, 734001
                        </p>
                    </div>
                    <div className="info-item">
                        <h3>Phone:</h3>
                        <p>+91-8436900456</p>
                        <p>+91-8436586516</p>
                    </div>
                    <div className="info-item">
                        <h3>Email:</h3>
                        <p>thedhronasofficial@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contactus;
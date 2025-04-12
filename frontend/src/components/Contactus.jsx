import React from 'react';
import './Contactus.css';

function ContactUs() {
    return (
        <div className="contactus-container">
            <h1 className="contactus-title">Get in touch</h1>
            <p className="contactus-subtitle">Get in touch with us by filling contact form below</p>
            <div className="contactus-content">
                <div className="contact-form">
                    <div className="form-group">
                        <input type="text" placeholder="Enter Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Enter Message"></textarea>
                    </div>
                    <button className="submit-btn">Submit</button>
                </div>
                <div className="contact-info">
                    <h3>Contact information</h3>
                    <p>Address: Flat No. 43, AT Mukherjee Road, Near SBI ATM, College Para, Siliguri, Darjeeling, West Bengal, 734001</p>
                    <p>Phone: +91-8436900456, +91-8436586516</p>
                    <p>Email: thedhronasofficial@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
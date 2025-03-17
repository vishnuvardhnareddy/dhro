import React from 'react';
// import './About.css';
import "./About.css"

function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">Why The Dhronas?</h1>
            <p className="about-subtitle">Your Personalised Coach</p>

            <div className="features-grid">
                {/* Feature 1: One to One Mentorship */}
                <div className="feature-card">
                    <img
                        src="https://www.thedhronas.com/icons/learn/img1.svg"
                        alt="One to One Mentorship"
                        className="feature-image"
                    />
                    <h2 className="feature-title">One to One Mentorship</h2>
                    <p className="feature-description">
                        Learning is an important step for achieving dreams in a student’s journey. We encourage the student to explore the concept in depth instead of memorising. The Mentorship Sessions make sure that the student is left with no doubt.
                    </p>
                </div>

                {/* Feature 2: Daily Practice Sessions */}
                <div className="feature-card">
                    <img
                        src="https://www.thedhronas.com/icons/learn/img1.svg"
                        alt="Daily Practice Sessions"
                        className="feature-image"
                    />
                    <h2 className="feature-title">Daily Practice Sessions</h2>
                    <p className="feature-description">
                        We believe in the philosophy that “practice makes a man perfect” and so does our curriculum follow the same ideology. Our tech-enabled platform is tailored for providing the best analysis to the students.
                    </p>
                </div>

                {/* Feature 3: Personalised Study Material */}
                <div className="feature-card">
                    <img
                        src="https://www.thedhronas.com/icons/learn/img1.svg"
                        alt="Personalised Study Material"
                        className="feature-image"
                    />
                    <h2 className="feature-title">Personalised Study Material</h2>
                    <p className="feature-description">
                        We provide study material that is fit for every student. Providing the same material to every student doesn’t yield good results. Our study material is optimized for students at different levels of preparation.
                    </p>
                </div>

                {/* Feature 4: Weekly Sessions */}
                <div className="feature-card">
                    <img
                        src="https://www.thedhronas.com/icons/learn/img1.svg"
                        alt="Weekly Sessions"
                        className="feature-image"
                    />
                    <h2 className="feature-title">Weekly Sessions</h2>
                    <p className="feature-description">
                        Interacting with students is a must for grooming. We interact with them on a weekly basis so that they can stay motivated throughout their journey.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
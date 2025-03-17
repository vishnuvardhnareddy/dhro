import React, { useState } from "react";
import "./Popup.css";

const Popup = () => {
    const [isVisible, setIsVisible] = useState(true);

    const closePopup = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="popup-overlay">
                <div className="popup-container">
                    <button className="popup-close" onClick={closePopup}>
                        &times;
                    </button>
                    <img
                        src="https://www.thedhronas.com/_next/image?url=%2Fnext_images%2Fcustomer%2Fimg31.jpeg&w=1080&q=75"
                        alt="Popup"
                        className="popup-image"
                    />
                </div>
            </div>
        )
    );
};

export default Popup;

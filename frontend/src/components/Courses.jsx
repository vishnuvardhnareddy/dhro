import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; // Import the CSS file

function Courses() {
    const [menuItems, setMenuItems] = useState({});
    const [selectedMenu, setSelectedMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/testseries/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch menu items");
                }
                const data = await response.json();
                const formattedMenuItems = data.data.reduce((acc, category) => {
                    acc[category.name] = category.subCategories.map(sub => ({ id: sub._id, name: sub.name }));
                    return acc;
                }, {});
                setMenuItems(formattedMenuItems);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleSubItemClick = (subItemId) => {
        navigate(`/testseries/${subItemId}`);
    };

    return (
        <div className="courses-container">
            <div className="nav-scroll">
                {Object.keys(menuItems).map((menu) => (
                    <button
                        key={menu}
                        className={`nav-item ${selectedMenu === menu ? 'active' : ''}`}
                        onClick={() => handleMenuClick(menu)}
                    >
                        {menu}
                    </button>
                ))}
            </div>

            <div className="cards-container">
                {selectedMenu && menuItems[selectedMenu].map((subItem) => (
                    <div key={subItem.id} className="card" onClick={() => handleSubItemClick(subItem.id)}>
                        <h3 className="card-title">{subItem.name}</h3>
                        <p className="card-subtitle">Batches Available</p>
                        <button className="explore-btn">
                            Explore
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
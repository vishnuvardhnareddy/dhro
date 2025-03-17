import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./Book.css"; // Import the separate CSS file
import pdf from '../components/pdfs/quant-sir-exclusive-book-for-ssc-cgl-maths-quantitative-aptitude-subject (1).pdf'

const Book = () => {
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/bookupload");
                console.log("Fetched Data:", response.data);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setBook(response.data[0]);
                } else {
                    setBook(response.data);
                }
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBookData();
    }, []);

    if (!book) {
        return <div className="text-center text-gray-500 py-10">Loading book details...</div>;
    }

    // Calculate total price based on quantity
    const totalPrice = (book.price || 0) * quantity;

    // Function to open PDF in a new tab
    const openPDF = () => {
        const pdfUrl = pdf || "http://localhost:5000/pdfs/sample.pdf"; // Use actual PDF URL
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="book-container">
            <div className="book-card">
                {/* Left - Book Image */}
                <div className="book-image-container">
                    <img src={book.bookimage || "placeholder.jpg"} alt={book.bookname || "Book"} className="book-image" />

                    {/* Open PDF Button */}
                    <button onClick={openPDF} className="download-btn">
                        View Sample
                    </button>
                </div>

                {/* Right - Book Details */}
                <div className="book-details">
                    <h1 className="book-title">{book.bookname || "Unknown Title"}</h1>
                    <p className="book-description">{book.aboutbook || "No description available."}</p>

                    {/* Ratings */}
                    <div className="rating-container">
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className={index < (book.ratings || 0) ? "fill-current" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="rating-text">({book.reviews || 0} ratings)</span>
                    </div>

                    {/* Book Info */}
                    <div className="book-info">
                        <p><strong>No. of Pages:</strong> {book.pages || "N/A"}</p>
                        <p><strong>Language:</strong> {book.language || "Unknown"}</p>
                        <p><strong>Publication Date:</strong> {book.publicationDate ? new Date(book.publicationDate).toDateString() : "Not Available"}</p>
                    </div>

                    {/* Price & Quantity Selection */}
                    <div className="book-price-section">
                        <p className="book-price">
                            ₹{totalPrice} <span className="strike-price">₹{book.originalPrice || "849"}</span>
                        </p>
                        <p className="in-stock">In Stock</p>

                        {/* Quantity Selection */}
                        <label htmlFor="quantity" className="quantity-label">Quantity:</label>
                        <select
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="quantity-select"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <div className="buy-buttons">
                            <button className="cart-btn">Add to Cart</button>
                            <button className="buy-btn">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;

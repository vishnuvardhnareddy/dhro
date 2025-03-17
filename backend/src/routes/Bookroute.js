const express = require("express");
const Book = require("../models/Book.model.js");

const router = express.Router();

// ✅ Upload a New Book
router.post("/", async (req, res) => {
    try {
        const { bookname, aboutbook, price, edition, bookimage, pages, language, publicationDate, ratings, reviews } = req.body;

        // Validate input fields
        if (!bookname || !aboutbook || !price || !edition || !bookimage || !pages || !language || !publicationDate || !ratings || !reviews) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newBook = new Book({
            bookname,
            aboutbook,
            price,
            edition: new Date(edition), // Ensure edition is stored as a Date
            bookimage, // Store the image URL
            pages,
            language,
            publicationDate: new Date(publicationDate),
            ratings,
            reviews
        });

        await newBook.save();

        res.status(201).json({
            message: "Book uploaded successfully!",
            book: newBook,
        });
    } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).json({ error: "Server error, try again!" });
    }
});

// ✅ Fetch All Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Could not fetch books." });
    }
});

// ✅ Fetch a Single Book by ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found." });
        }
        res.json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Could not fetch book." });
    }
});

// ✅ Update a Book by ID
router.put("/:id", async (req, res) => {
    try {
        const { bookname, aboutbook, price, edition, bookimage, pages, language, publicationDate, ratings, reviews } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                bookname,
                aboutbook,
                price,
                edition: edition ? new Date(edition) : undefined,
                bookimage,
                pages,
                language,
                publicationDate: publicationDate ? new Date(publicationDate) : undefined,
                ratings,
                reviews
            },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found." });
        }

        res.json({ message: "Book updated successfully!", updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Could not update book." });
    }
});

// ✅ Delete a Book by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found." });
        }
        res.json({ message: "Book deleted successfully!" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Could not delete book." });
    }
});

module.exports = router;

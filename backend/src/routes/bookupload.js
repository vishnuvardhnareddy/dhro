const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');

// Fetch all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
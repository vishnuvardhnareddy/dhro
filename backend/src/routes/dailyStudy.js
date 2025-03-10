const express = require('express');
const router = express.Router();

const dailyStudyItems = [
    { id: 1, name: "Books", slug: "books" },
    { id: 2, name: "Daily Dose", slug: "daily-dose" },
    { id: 3, name: "Current Affairs", slug: "current-affairs" }
];

// Get Daily Study Items
router.get('/items', (req, res) => {
    res.json({ success: true, data: dailyStudyItems });
});

module.exports = router;

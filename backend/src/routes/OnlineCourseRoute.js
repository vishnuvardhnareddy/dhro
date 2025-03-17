const express = require('express');
const router = express.Router();
const OnlineCourse = require('../models/online.model'); // Corrected file path

// Fetch all online courses
router.get('/', async (req, res) => {
    try {
        const onlineCourses = await OnlineCourse.find();
        res.json(onlineCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
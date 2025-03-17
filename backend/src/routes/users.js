const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');  // Importing auth middleware to verify JWT token
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add course to user's profile (when they purchase a course)
router.put('/me/add-course', auth, async (req, res) => {
    try {
        const { title, imgUrl } = req.body;

        if (!title || !imgUrl) {
            return res.status(400).json({ error: 'Course title and image URL are required' });
        }

        const user = req.user;

        // Check if the course already exists
        const courseExists = user.courses.some(course => course.title === title);
        if (courseExists) {
            return res.status(400).json({ error: 'Course already exists' });
        }

        // Add the new course to the user's courses array
        user.courses.push({ title, imgUrl });

        await user.save();

        res.json({ message: 'Course added successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all courses of a user
router.get('/me/courses', auth, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ courses: user.courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user password without bcrypt
router.put('/me/change-password', auth, async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const user = req.user;
        user.password = password; // Directly storing the password without hashing

        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

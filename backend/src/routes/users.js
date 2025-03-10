const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const user = await User.findById(req.user._id);

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.password = req.body.password;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
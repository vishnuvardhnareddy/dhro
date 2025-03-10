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

module.exports = router;
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model to access the database

// Middleware to authenticate the user by verifying the JWT token
const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove "Bearer " from token

        if (!token) {
            return res.status(401).json({ error: 'No token found, please log in' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using the secret key
        const user = await User.findById(decoded.userId); // Find the user by ID from the decoded token

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user information to request object
        req.user = user;
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = auth;

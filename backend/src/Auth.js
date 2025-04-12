const express = require("express");
const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Ensure this path is correct
const User = require("./models/User.js");
const router = express.Router();

// **User Registration Route**
router.post("/register", async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone already registered." });
        }

        // Create a new user (store password directly)
        const newUser = new User({ name, email, phone, password }); // Storing password directly in plain text
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, name: newUser.name, message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});

// **User Login Route**
router.post("/login", async (req, res) => {
    const { emailOrPhone, password } = req.body; // Expecting password here as well

    try {
        // Find the user by email or phone
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });

        if (!user) {
            return res.status(400).json({ message: "Invalid email/phone." });
        }

        // Check if the password exists and matches the stored password
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, name: user.name, userId: user._id, message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;

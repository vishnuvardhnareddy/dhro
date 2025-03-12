const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const router = express.Router();

// ✅ Password validation function
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return passwordRegex.test(password);
};

// **🔹 User Registration Route**
router.post("/register", async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // 🔹 Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone already registered." });
        }

        // 🔹 Validate password strength
        if (!isValidPassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long, contain one uppercase letter, and one special character."
            });
        }

        // 🔹 Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🔹 Create new user
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        // 🔹 Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, name: newUser.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            token,
            userId: newUser._id,
            name: newUser.name,
            message: "User registered successfully."
        });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server error during registration." });
    }
});

// **🔹 User Login Route**
router.post("/login", async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        // 🔹 Find user by email or phone
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        if (!user) {
            return res.status(400).json({ message: "Invalid email/phone or password." });
        }

        // 🔹 Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email/phone or password." });
        }

        // 🔹 Generate JWT token
        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            userId: user._id,  // ✅ Now returns userId
            name: user.name,
            message: "Login successful."
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

module.exports = router;

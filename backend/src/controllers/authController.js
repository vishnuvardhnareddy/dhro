exports.login = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });

        if (!user) return res.status(400).json({ message: "Invalid email/phone or password." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email/phone or password." });

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

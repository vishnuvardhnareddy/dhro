const Result = require("../models/Result");
const mongoose = require("mongoose");

// ✅ Save test results
const submitTest = async (req, res) => {
    try {
        let { userId, testId, totalMarks, obtainedMarks, answers } = req.body;

        // 🔥 Validate userId
        if (!userId || userId === "null") {
            return res.status(400).json({ message: "Invalid user ID. Please log in again." });
        }

        // ✅ Convert userId to ObjectId
        userId = new mongoose.Types.ObjectId(userId);

        const result = new Result({ userId, testId, totalMarks, obtainedMarks, answers });
        await result.save();

        res.status(201).json({ message: "Test submitted successfully", result });
    } catch (error) {
        console.error("❌ Error saving test result:", error);
        res.status(500).json({ message: "Server error while submitting test", error });
    }
};

// ✅ Fetch results by user
const getResultByUser = async (req, res) => {
    try {
        let { userId } = req.params;

        // 🔥 Validate userId
        if (!userId || userId === "null" || !mongoose.Types.ObjectId.isValid(userId)) {
            console.error("❌ Invalid userId received:", userId);
            return res.status(400).json({ message: "Invalid user ID." });
        }

        // ✅ Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        console.log("Fetching results for userId:", objectId); // Add logging

        const results = await Result.find({ userId: objectId }).populate("testId");

        if (!results || results.length === 0) {
            console.log("⚠ No results found for userId:", userId);
            return res.status(404).json({ message: "No results found." });
        }

        console.log("✅ Results fetched successfully for userId:", userId);
        res.status(200).json({ results });
    } catch (error) {
        console.error("❌ Error fetching results:", error);
        console.error("Error stack trace:", error.stack); // Add stack trace logging
        res.status(500).json({ message: "Server error while fetching results", error: error.message });
    }
};

// ✅ Ensure functions are properly exported
module.exports = { submitTest, getResultByUser };

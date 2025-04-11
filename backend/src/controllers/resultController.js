// controllers/resultController.js

const TestResult = require('../models/testResult.model'); // adjust path if needed

exports.getUserResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await TestResult.find({ userId }).populate('mockTestId');
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

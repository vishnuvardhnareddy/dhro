const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController"); // ✅ Ensure correct import

// ✅ Check if resultController functions exist before using them
if (!resultController.submitTest || !resultController.getResultByUser) {
    console.error("❌ ERROR: Missing controller functions in `resultController.js`");
}

// ✅ Ensure routes have valid callback functions
router.post("/submit", resultController.submitTest);  // 🚀 Fix POST route
router.get("/:userId", resultController.getResultByUser);  // 🚀 Fix GET route

module.exports = router;

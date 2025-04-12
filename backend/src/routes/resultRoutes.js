const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController'); // adjust path
const { submitMockTest } = require("../controllers/submitMockTest")

// Route to get all results for a user
router.get('/:userId', resultController.getUserResults);

// const a = () => {
//     console.log("jii");
// }
router.post("/submit", submitMockTest)
module.exports = router;

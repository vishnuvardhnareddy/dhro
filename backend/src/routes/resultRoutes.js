const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController'); // adjust path

// Route to get all results for a user
router.get('/:userId', resultController.getUserResults);

module.exports = router;

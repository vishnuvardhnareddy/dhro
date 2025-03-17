const express = require('express');
const router = express.Router();
const { getOnlineCourses, getOfflineCourses, getCourseById } = require('../controllers/coursesController');

router.get('/onlineCourses', getOnlineCourses);
router.get('/offlineCourses', getOfflineCourses);
router.get('/:type/:courseId', getCourseById);

module.exports = router;
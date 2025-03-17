const OnlineCourse = require('../models/online.model');
const OfflineCourse = require('../models/offlineCourse.model');

exports.getOnlineCourses = async (req, res) => {
    try {
        const courses = await OnlineCourse.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOfflineCourses = async (req, res) => {
    try {
        const courses = await OfflineCourse.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    const { type, courseId } = req.params;
    try {
        const course = type === 'online' ? await OnlineCourse.findById(courseId) : await OfflineCourse.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
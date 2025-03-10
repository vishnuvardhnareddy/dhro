const express = require("express");
const OnlineCourse = require("../models/online.model.js"); // Import the schema

const router = express.Router();

// @route   POST /api/onlineCourses
// @desc    Add a new online course
// @access  Public
router.post("/", async (req, res) => {
    try {
        const courseData = req.body;

        // Create a new course document
        const newCourse = new OnlineCourse(courseData);

        // Save course to database
        const savedCourse = await newCourse.save();

        res.status(201).json({ message: "Course added successfully!", data: savedCourse });
    } catch (error) {
        res.status(500).json({ error: "Failed to add course", details: error.message });
    }
});

// @route   GET /api/onlineCourses
// @desc    Get all online courses
// @access  Public
router.get("/", async (req, res) => {
    try {
        const courses = await OnlineCourse.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses", details: error.message });
    }
});

// @route   GET /api/onlineCourses/:id
// @desc    Get a single online course by ID
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const course = await OnlineCourse.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course", details: error.message });
    }
});

// @route   PUT /api/onlineCourses/:id
// @desc    Update an online course
// @access  Public
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await OnlineCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: "Failed to update course", details: error.message });
    }
});

// @route   DELETE /api/onlineCourses/:id
// @desc    Delete an online course
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await OnlineCourse.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course", details: error.message });
    }
});

module.exports = router;
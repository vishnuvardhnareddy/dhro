const express = require("express");
const OfflineCourse = require("../models/offline.model.js"); // Import OfflineCourse Schema

const router = express.Router();

// @route   POST /api/offlineCourses
// @desc    Add a new offline course
// @access  Public
router.post("/", async (req, res) => {
    try {
        const courseData = req.body;

        // Create a new offline course document
        const newCourse = new OfflineCourse(courseData);

        // Save course to database
        const savedCourse = await newCourse.save();

        res.status(201).json({ message: "Offline course added successfully!", data: savedCourse });
    } catch (error) {
        res.status(500).json({ error: "Failed to add offline course", details: error.message });
    }
});

// @route   GET /api/offlineCourses
// @desc    Get all offline courses
// @access  Public
router.get("/", async (req, res) => {
    try {
        const courses = await OfflineCourse.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch offline courses", details: error.message });
    }
});

// @route   GET /api/offlineCourses/:id
// @desc    Get a single offline course by ID
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const course = await OfflineCourse.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Offline course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch offline course", details: error.message });
    }
});

// @route   PUT /api/offlineCourses/:id
// @desc    Update an offline course
// @access  Public
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await OfflineCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: "Offline course not found" });
        }
        res.status(200).json({ message: "Offline course updated successfully", data: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: "Failed to update offline course", details: error.message });
    }
});

// @route   DELETE /api/offlineCourses/:id
// @desc    Delete an offline course
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await OfflineCourse.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Offline course not found" });
        }
        res.status(200).json({ message: "Offline course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete offline course", details: error.message });
    }
});

module.exports = router;
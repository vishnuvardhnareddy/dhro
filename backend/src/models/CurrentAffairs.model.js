const express = require("express");
const mongoose = require("mongoose");
const CurrentAffair = require("../models/CurrentAffairs.model.js");
const router = express.Router();

// Route to add a new current affair
router.post("/", async (req, res) => {
    try {
        const { title, img, data, keyPoints, date } = req.body;

        if (!title || !img || !data || !date) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newCurrentAffair = new CurrentAffair({
            title,
            img,
            data,
            keyPoints: keyPoints || [], // Default to empty array if not provided
            date: new Date(date), // Ensure date is stored in proper format
        });

        await newCurrentAffair.save();
        res.status(201).json({ message: "Current affair added successfully", newCurrentAffair });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get current affairs by date
router.get("/", async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        const affairs = await CurrentAffair.find({ date: new Date(date) });

        res.status(200).json({ affairs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

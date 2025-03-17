const express = require('express');
const mongoose = require('mongoose');
const DailyDose = require('../models/DailyDose.model'); // Ensure correct model import
const { upload, cloudinary } = require('../utils/cloudinary.js'); // Proper Cloudinary import

const router = express.Router();

// ✅ Upload PDF Route (By Date, Language & Category)
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { date, language, category } = req.body;

        // Validate inputs
        if (!date || !language || !category) {
            return res.status(400).json({ error: 'Date, language, and category are required' });
        }
        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract file details from Cloudinary response
        const fileUrl = req.file.path; // Cloudinary Secure URL
        const cloudinaryId = req.file.filename || req.file.public_id; // Correct ID for Cloudinary

        if (!fileUrl || !cloudinaryId) {
            return res.status(500).json({ error: 'File upload to Cloudinary failed' });
        }

        // Check if an entry for the date and language already exists
        let pdfEntry = await DailyDose.findOne({ date, language });

        if (!pdfEntry) {
            // If no entry exists, create a new one
            pdfEntry = new DailyDose({ date, language, categories: [] });
        }

        // Check if the category already exists
        const categoryIndex = pdfEntry.categories.findIndex(cat => cat.title === category);

        if (categoryIndex !== -1) {
            // Update existing category
            pdfEntry.categories[categoryIndex].url = fileUrl;
            pdfEntry.categories[categoryIndex].cloudinaryId = cloudinaryId;
            pdfEntry.categories[categoryIndex].status = "Available";
        } else {
            // Add new category entry
            pdfEntry.categories.push({
                title: category,
                url: fileUrl,
                cloudinaryId: cloudinaryId,
                status: "Available"
            });
        }

        await pdfEntry.save();
        res.status(201).json({ message: 'PDF uploaded successfully', pdfEntry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All PDFs (Grouped by Date & Language)
router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await DailyDose.find();
        res.json(pdfs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get PDFs by Date & Language
router.get('/pdfs/:date/:language', async (req, res) => {
    try {
        const { date, language } = req.params;

        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }

        const pdfEntry = await DailyDose.findOne({ date, language });

        if (!pdfEntry || pdfEntry.categories.length === 0) {
            return res.status(404).json({ error: `No PDFs found for ${language} on ${date}` });
        }

        res.json(pdfEntry.categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Specific PDF by Date, Language & Category
router.get('/pdfs/:date/:language/:category', async (req, res) => {
    try {
        const { date, language, category } = req.params;

        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }

        const pdfEntry = await DailyDose.findOne({ date, language });

        if (!pdfEntry) {
            return res.status(404).json({ error: `No PDFs found for ${language} on ${date}` });
        }

        const categoryEntry = pdfEntry.categories.find(c => c.title === category);
        if (!categoryEntry) {
            return res.status(404).json({ error: `No PDFs found for category "${category}" on ${date}` });
        }

        res.json(categoryEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a Specific PDF by Date, Language & Category
router.delete('/pdfs/:date/:language/:category', async (req, res) => {
    try {
        const { date, language, category } = req.params;

        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }

        const pdfEntry = await DailyDose.findOne({ date, language });

        if (!pdfEntry) {
            return res.status(404).json({ error: `No PDFs found for ${language} on ${date}` });
        }

        const categoryIndex = pdfEntry.categories.findIndex(c => c.title === category);
        if (categoryIndex === -1) {
            return res.status(404).json({ error: `Category "${category}" not found` });
        }

        // ✅ Remove from Cloudinary if exists
        const cloudinaryId = pdfEntry.categories[categoryIndex].cloudinaryId;
        if (cloudinaryId) {
            try {
                await cloudinary.uploader.destroy(cloudinaryId);
            } catch (cloudError) {
                console.error('Error deleting from Cloudinary:', cloudError);
            }
        }

        // ✅ Remove from MongoDB
        pdfEntry.categories.splice(categoryIndex, 1);
        await pdfEntry.save();

        res.json({ message: 'PDF deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

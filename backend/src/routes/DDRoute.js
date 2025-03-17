const express = require('express');
const mongoose = require('mongoose');
const Pdfs = require('../models/pdf.model.js'); // Ensure correct model import
const { upload } = require('../utils/cloudinary.js');

const router = express.Router();
const cloudinary = require('../utils/cloudinary.js').cloudinary;

// ✅ Upload PDF Route (By Date & Language)
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { date, language } = req.body;

        // Validate inputs
        if (!date || !language) {
            return res.status(400).json({ error: 'Date and language are required' });
        }
        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if an entry for the date already exists    
        let pdfEntry = await Pdfs.findOne({ date });

        if (!pdfEntry) {
            // If no entry exists, create a new one
            pdfEntry = new Pdfs({ date, pdfs: { English: [], Hindi: [], Bengali: [] } });
        }

        // Add the new PDF under the correct language category
        pdfEntry.pdfs[language].push({
            name: req.file.originalname,
            url: req.file.path, // Cloudinary URL
            cloudinaryId: req.file.filename // Unique Cloudinary ID
        });

        await pdfEntry.save();
        res.status(201).json({ message: 'PDF uploaded successfully', pdfEntry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All PDFs (Grouped by Date)
router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await Pdfs.find();
        res.json(pdfs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get PDFs by Date
router.get('/pdfs/:date', async (req, res) => {
    try {
        const pdfEntry = await Pdfs.findOne({ date: req.params.date });

        if (!pdfEntry) {
            return res.status(404).json({ error: 'No PDFs found for this date' });
        }

        res.json(pdfEntry);
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

        const pdfEntry = await Pdfs.findOne({ date });

        if (!pdfEntry || !pdfEntry.pdfs[language] || pdfEntry.pdfs[language].length === 0) {
            return res.status(404).json({ error: `No PDFs found for ${language} on ${date}` });
        }

        res.json(pdfEntry.pdfs[language]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a Specific PDF by ID (From a Specific Date & Language)
router.delete('/pdfs/:date/:language/:pdfId', async (req, res) => {
    try {
        const { date, language, pdfId } = req.params;

        if (!['English', 'Hindi', 'Bengali'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }

        const pdfEntry = await Pdfs.findOne({ date });

        if (!pdfEntry || !pdfEntry.pdfs[language]) {
            return res.status(404).json({ error: `No PDFs found for ${language} on ${date}` });
        }

        // Find and remove the specific PDF from the language array
        const pdfIndex = pdfEntry.pdfs[language].findIndex(pdf => pdf._id.toString() === pdfId);
        if (pdfIndex === -1) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        // Remove from Cloudinary
        await cloudinary.uploader.destroy(pdfEntry.pdfs[language][pdfIndex].cloudinaryId);

        // Remove from MongoDB
        pdfEntry.pdfs[language].splice(pdfIndex, 1);
        await pdfEntry.save();

        res.json({ message: 'PDF deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
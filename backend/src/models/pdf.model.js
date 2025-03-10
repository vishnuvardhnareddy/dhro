const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    date: {
        type: String, // Store as YYYY-MM-DD
        required: true
    },
    pdfs: {
        English: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true }, // Cloudinary URL
                cloudinaryId: { type: String, required: true } // Cloudinary public_id
            }
        ],
        Hindi: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
                cloudinaryId: { type: String, required: true }
            }
        ],
        Bengali: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
                cloudinaryId: { type: String, required: true }
            }
        ]
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Pdfs = mongoose.model('Pdf', pdfSchema);
module.exports = Pdfs;

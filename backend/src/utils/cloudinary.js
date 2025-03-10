const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


// Configure Cloudinary with credentials from .env file
cloudinary.config({
    cloud_name: 'dzjfzbzyt',
    api_key: '459794515323733',
    api_secret: 'zQGxMOHYE3w0E9aNCS83jkek5u8' // Click 'View API Keys' above to copy your API secret
});

// Multer Storage for PDFs
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: `pdfs/${req.body.category}`, // Store PDFs in category-based folders
            resource_type: 'raw',  // Ensures PDFs are treated correctly
            format: 'pdf'  // Ensures the uploaded file remains as a PDF
        };
    }
});

// Multer Middleware for handling file uploads
const upload = multer({ storage });

module.exports = { upload, cloudinary };

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        bookname: { type: String, required: true },
        aboutbook: { type: String, required: true },
        price: { type: String, required: true },
        edition: { type: Date, required: true },
        bookimage: { type: String, required: true }, // Cloudinary or direct link
        pages: { type: Number, required: true }, // New field for number of pages
        language: { type: String, required: true }, // e.g., "ENGLISH"
        publicationDate: { type: Date, required: true },
        ratings: { type: Number, required: true }, // e.g., 4.9
        reviews: { type: Number, required: true }, // e.g., 31 ratings
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

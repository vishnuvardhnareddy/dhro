const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 1
    },
    mockTest: {
        type: String,
        required: true,
    }
});

// Mock Test Schema
const mockTestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    questions: [questionSchema], // Array of Questions
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Subcategory Schema
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    mockTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MockTest' // Linking Mock Tests
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update timestamps
categorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Models
const MockTest = mongoose.model('MockTest', mockTestSchema);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { MockTest, SubCategory, Category };
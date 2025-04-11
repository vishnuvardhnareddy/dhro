const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // if you have a User model
    },
    mockTestId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MockTest'
    },
    score: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TestResult', testResultSchema);

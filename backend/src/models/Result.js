const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    answers: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);

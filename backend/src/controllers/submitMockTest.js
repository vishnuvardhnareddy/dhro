const TestResult = require('../models/testResult.model');
const MockTest = require('../models/testseries.models').MockTest;

exports.submitMockTest = async (req, res) => {
    try {
        const { userId, mockTestId, answers } = req.body;

        const mockTest = await MockTest.findById(mockTestId);
        if (!mockTest) {
            return res.status(404).json({ success: false, message: "Mock Test not found" });
        }

        let score = 0;
        const resultAnswers = [];

        for (let answer of answers) {
            const question = mockTest.questions.id(answer.questionId);
            if (!question) continue;

            const isCorrect = question.correctAnswer === answer.selectedOption;
            if (isCorrect) score += question.marks;

            resultAnswers.push({
                questionId: answer.questionId,
                selectedOption: answer.selectedOption,
                isCorrect
            });
        }

        const result = new TestResult({
            userId,
            mockTestId,
            score,
            totalMarks: mockTest.totalMarks,
            answers: resultAnswers
        });

        await result.save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

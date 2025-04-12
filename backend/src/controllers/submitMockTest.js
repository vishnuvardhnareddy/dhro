const TestResult = require('../models/testResult.model');
const MockTest = require('../models/testseries.models').MockTest;

const submitMockTest = async (req, res) => {
    try {
        const { userId, testId, answers } = req.body;

        const mockTest = await MockTest.findById(testId);
        if (!mockTest) {
            return res.status(404).json({ success: false, message: "Mock Test not found" });
        }

        let score = 0;
        const resultAnswers = [];

        mockTest.questions.forEach((question, index) => {
            const selectedOption = answers[index];
            const isCorrect = question.correctAnswer === selectedOption;
            if (isCorrect) score += question.marks;

            resultAnswers.push({
                questionId: question._id,
                selectedOption,
                isCorrect
            });
        });


        const result = new TestResult({
            userId,
            mockTestId: testId,
            score,
            totalMarks: mockTest.totalMarks,
            answers: resultAnswers
        });

        // console.log(userId);

        await result.save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 👇 Correct way to export
exports.submitMockTest = submitMockTest;

const mongoose = require('mongoose');
const { MockTest, SubCategory, Category } = require('../models/testseries.models');
const TestResult = require('../models/testResult.model');

// ------------------- CATEGORY CONTROLLERS -------------------

// Create a new category
exports.createCategory = async (req, res) => {
    try {

        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subCategories');
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subCategories');
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete category (and all associated subcategories and mock tests)
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Validate categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        // Find the category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Find all subcategories linked to the category
        const subCategories = await SubCategory.find({ _id: { $in: category.subCategories } });

        // Delete all mock tests linked to the subcategories
        for (const subCategory of subCategories) {
            await MockTest.deleteMany({ _id: { $in: subCategory.mockTests } });
        }

        // Delete all subcategories linked to the category
        await SubCategory.deleteMany({ _id: { $in: category.subCategories } });

        // Delete the category
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ success: true, message: "Category and all associated subcategories and mock tests deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------- SUBCATEGORY CONTROLLERS -------------------

// Create a subcategory under a category
exports.createSubCategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;

        // Validate categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Create and save the subcategory
        const subCategory = new SubCategory({ name, description });
        await subCategory.save();

        // Add the subcategory to the category
        await Category.findByIdAndUpdate(categoryId, { $push: { subCategories: subCategory._id } });

        res.status(201).json({ success: true, data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update subcategory
exports.updateSubCategory = async (req, res) => {
    const { mockTestId } = req.body;
    const subCategoryId = req.params.subCategoryId;

    try {
        // Validate subCategoryId
        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
        }

        // Validate mockTestId
        if (!mongoose.Types.ObjectId.isValid(mockTestId)) {
            return res.status(400).json({ success: false, message: "Invalid mock test ID" });
        }

        // Find the subcategory
        const sub = await SubCategory.findById(subCategoryId);
        if (!sub) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        // Add mock test ID to subcategory
        sub.mockTests.push(mockTestId);
        await sub.save();

        return res.status(200).json({ success: true, message: "Mock test added to subcategory", data: sub });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all subcategories
exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('mockTests');
        res.status(200).json({ success: true, data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get subcategory by ID
exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate('mockTests');
        if (!subCategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
        res.status(200).json({ success: true, data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get subcategories by category ID
exports.getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subCategories = await SubCategory.find({ categoryId }).populate('mockTests');
        res.status(200).json({ success: true, data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete subcategory (and all associated mock tests)
exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;

        // Validate subCategoryId
        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
        }

        // Find the subcategory
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        // Delete all mock tests linked to the subcategory
        await MockTest.deleteMany({ _id: { $in: subCategory.mockTests } });

        // Delete the subcategory
        await SubCategory.findByIdAndDelete(subCategoryId);

        res.status(200).json({ success: true, message: "Subcategory and all associated mock tests deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------- MOCK TEST CONTROLLERS -------------------

// Create a mock test under a subcategory
exports.createMockTest = async (req, res) => {
    try {
        const { title, description, duration, totalMarks, questions, subCategoryId } = req.body;

        // Validate subCategoryId
        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
        }

        // Check if the subcategory exists
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        // Create and save the mock test
        const mockTest = new MockTest({ title, description, duration, totalMarks, questions });
        await mockTest.save();

        // Add the mock test to the subcategory
        await SubCategory.findByIdAndUpdate(subCategoryId, { $push: { mockTests: mockTest._id } });

        res.status(201).json({ success: true, data: mockTest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all mock tests
exports.getMockTests = async (req, res) => {
    try {
        const mockTests = await MockTest.find();
        res.status(200).json({ success: true, data: mockTests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get mock test by ID
exports.getMockTestById = async (req, res) => {
    try {
        const mockTest = await MockTest.findById(req.params.id);
        if (!mockTest) return res.status(404).json({ success: false, message: 'Mock test not found' });
        res.status(200).json({ success: true, data: mockTest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete mock test
exports.deleteMockTest = async (req, res) => {
    try {
        const mockTestId = req.params.id;

        // Validate mockTestId
        if (!mongoose.Types.ObjectId.isValid(mockTestId)) {
            return res.status(400).json({ success: false, message: "Invalid mock test ID" });
        }

        // Find and delete the mock test
        await MockTest.findByIdAndDelete(mockTestId);

        res.status(200).json({ success: true, message: "Mock test deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------- TEST SUBMISSION CONTROLLER -------------------
exports.submitTest = async (req, res) => {
    try {
        const { testId, answers, startTime, endTime } = req.body;
        const userId = req.user._id; // Ensure user authentication middleware is in place

        // Fetch test to get correct answers
        const test = await MockTest.findById(testId);
        if (!test) {
            return res.status(404).json({ success: false, message: "Mock test not found" });
        }

        // Calculate score
        let score = 0;
        test.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score += question.marks || 1;
            }
        });

        // Store test result
        const testResult = new TestResult({
            userId,
            testId,
            answers,
            startTime,
            endTime,
            score,
        });

        await testResult.save();

        res.status(201).json({ success: true, message: "Test submitted successfully", data: testResult });
    } catch (error) {
        console.error("Error submitting test:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserTestResults = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure user authentication middleware is in place

        // Fetch user's test results
        const results = await TestResult.find({ userId }).populate("testId", "title");

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error("Error fetching test results:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

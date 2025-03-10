const express = require("express");
const router = express.Router();
const testSeriesController = require("../controllers/testseries.controllers.js");
const authMiddleware = require("../middlewares/authMiddleware"); // ✅ Correct import

// ------------------- CATEGORY ROUTES -------------------
router.post("/categories", testSeriesController.createCategory);
router.get("/categories", testSeriesController.getCategories);
router.get("/categories/:id", testSeriesController.getCategoryById);
router.delete("/categories/:id", testSeriesController.deleteCategory);

// ------------------- SUBCATEGORY ROUTES -------------------
router.post("/subcategories", testSeriesController.createSubCategory);
router.patch("/subcategories/:subCategoryId", testSeriesController.updateSubCategory);
router.get("/subcategories", testSeriesController.getSubCategories);
router.get("/subcategories/:id", testSeriesController.getSubCategoryById);
router.get("/categories/:categoryId/subcategories", testSeriesController.getSubCategoriesByCategoryId);
router.delete("/subcategories/:id", testSeriesController.deleteSubCategory);

// ------------------- MOCK TEST ROUTES -------------------
router.post("/mocktests", testSeriesController.createMockTest);
router.get("/mocktests", testSeriesController.getMockTests);
router.get("/mocktests/:id", testSeriesController.getMockTestById);
router.delete("/mocktests/:id", testSeriesController.deleteMockTest);

// ------------------- TEST SUBMISSION & RESULTS ROUTES -------------------
router.post("/submit", authMiddleware, testSeriesController.submitTest); // ✅ Requires Authentication
router.get("/results", authMiddleware, testSeriesController.getUserTestResults); // ✅ User can view test results

module.exports = router;

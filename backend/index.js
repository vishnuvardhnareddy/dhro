require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const OnlineCourses = require("./src/routes/OnlineCourseRoute");
const OfflineCourses = require("./src/routes/OfflineCourseRoute");
const DailyDose = require("./src/routes/DDRoute");
const testSeriesRoutes = require("./src/routes/testseries.routes");
const authRoutes = require("./src/Auth");
const blog = require("./src/routes/blogs.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error Connecting to MongoDB:", error);
        process.exit(1);
    }
};

dbConnect();

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Express.js API!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/blog", blog);
app.use("/api/testseries", testSeriesRoutes);
app.use("/api/onlineCourses", OnlineCourses);
app.use("/api/offlineCourses", OfflineCourses);
app.use("/uploadDD", DailyDose);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
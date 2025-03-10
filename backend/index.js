require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const authRoutes = require("./src/Auth");
const blogRoutes = require("./src/routes/blogs.routes");
const testSeriesRoutes = require("./src/routes/testseries.routes");
const onlineCoursesRoutes = require("./src/routes/OnlineCourseRoute");
const offlineCoursesRoutes = require("./src/routes/OfflineCourseRoute");
const DailyDose = require("./src/routes/DDRoute");
const CurrentAffair = require("./src/routes/currentaffairs")
const Book = require("./src/routes/Bookroute")
const dailyStudyRoutes = require("./src/routes/dailyStudy");

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
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Error Connecting to MongoDB:", error);
        process.exit(1); // Stop the app if DB connection fails
    }
};

dbConnect();

// Default route
app.get("/", (req, res) => {
    res.send("✅ Express.js API is Running Successfully!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/api/testseries", testSeriesRoutes);
app.use("/api/onlineCourses", onlineCoursesRoutes);
app.use("/api/offlineCourses", offlineCoursesRoutes);
app.use("/uploadDD", DailyDose)
app.use("/bookupload", Book)
app.use("/ca", CurrentAffair)
app.use('/api/dailystudy', dailyStudyRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});

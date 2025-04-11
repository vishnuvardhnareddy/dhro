require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const resultRoutes = require('./src/routes/resultRoutes'); // adjust path


// Import Routes
const authRoutes = require("./src/Auth");
const blogRoutes = require("./src/routes/blogs.routes");
const testSeriesRoutes = require("./src/routes/testseries.routes");
const onlineCoursesRoutes = require("./src/routes/OnlineCourseRoute");
const offlineCoursesRoutes = require("./src/routes/OfflineCourseRoute");
const dailyDoseRoutes = require("./src/routes/DDRoute");
const currentAffairRoutes = require("./src/routes/currentaffairs");
const bookRoutes = require("./src/routes/Bookroute");
const dailyStudyRoutes = require("./src/routes/dailyStudy");
const userRoutes = require("./src/routes/users");

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
app.use("/uploadDD", dailyDoseRoutes);
app.use("/bookupload", bookRoutes);
app.use("/ca", currentAffairRoutes);
app.use('/api/dailystudy', dailyStudyRoutes);
app.use("/api/users", userRoutes);
app.use('/api/results', resultRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});

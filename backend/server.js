console.log("Server started");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const habitRoutes = require("./routes/habitRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/habits", habitRoutes);
app.use("/api/users", userRoutes);

// Test Routes
app.get("/", (req, res) => {
    res.send("HabitFlow Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend Connected Successfully 🚀"
    });
});

// MongoDB Connection
let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("✅ MongoDB Connected");
}

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Local Development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;

    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    });
}

module.exports = app;
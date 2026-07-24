const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const userRoutes = require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const habitRoutes = require("./routes/habitRoutes");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/habits", habitRoutes);
app.use("/api/users", userRoutes);


// Home Test Route
app.get("/", (req, res) => {
    res.send("HabitFlow Backend Running 🚀");
});


// Frontend Connection Test Route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend Connected Successfully 🚀"
    });
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
        console.log("🚀 Server running on port 5000");
    });

})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
});
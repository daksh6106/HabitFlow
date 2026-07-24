const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
    res.json({
        message: "User Route Working ✅"
    });
});

// Register User
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// Login User

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find User

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare Password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // Generate Token

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({

            message: "Login Successful",

            token

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
// Get Current User
router.get("/me", auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// =====================================
// Change Password
// PUT /api/users/change-password
// =====================================

router.put("/change-password", auth, async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.json({
            message: "Password changed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Get Profile

router.get("/profile", auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;

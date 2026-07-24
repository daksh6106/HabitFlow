const express = require("express");
const router = express.Router();

const Habit = require("../models/habit");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { 
    updateUserStreak,
    checkHabitAchievements
} = require("../utils/streak");
// ========================
// Get All Habits
// ========================
router.get("/", auth, async (req, res) => {

    try {

        const habits = await Habit.find({
            user: req.user.id
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let updated = false;

        for (const habit of habits) {

            let isCompletedToday = false;

            if (habit.lastCompleted) {

                const last = new Date(habit.lastCompleted);
                last.setHours(0, 0, 0, 0);

                if (last.getTime() === today.getTime()) {
                    isCompletedToday = true;
                }
            }

           if (habit.completed !== isCompletedToday) {

    habit.completed = isCompletedToday;
    await habit.save();

}

        }

        res.json(habits);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// ========================
// Add Habit
// ========================
router.post("/", auth, async (req, res) => {

    try {

        console.log("POST req.user =", req.user);

        const habit = new Habit({
            user: req.user.id,
            name: req.body.name,
            description: req.body.description
        });

        await habit.save();

        res.status(201).json(habit);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

// ========================
// Update Habit
// ========================
router.put("/:id", auth, async (req, res) => {

    try {

        const habit = await Habit.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        // Update Name
        if (req.body.name !== undefined) {
            habit.name = req.body.name;
        }

        // Update Description
        if (req.body.description !== undefined) {
            habit.description = req.body.description;
        }

        // Update Completed Status
        if (req.body.completed !== undefined) {

            habit.completed = req.body.completed;

            // Save completion history only when completed
            if (req.body.completed === true) {

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const alreadyCompletedToday = habit.completedDates.some(date => {

                    const completedDate = new Date(date);
                    completedDate.setHours(0, 0, 0, 0);

                    return completedDate.getTime() === today.getTime();

                });

                if (!alreadyCompletedToday) {

                    habit.completedDates.push(today);
                    habit.lastCompleted = today;

                    await updateUserStreak(req.user.id);
                    await checkHabitAchievements(req.user.id);

                }

            }

        }

        await habit.save();

        res.json(habit);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ========================
// Delete Habit
// ========================
router.delete("/:id", auth, async (req, res) => {

    try {

        await Habit.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        res.json({
            message: "Habit deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;
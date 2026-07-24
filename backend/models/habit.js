const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    completed: {
        type: Boolean,
        default: false
    },

    // Last time habit was completed
    lastCompleted: {
        type: Date,
        default: null
    },

    // Store all completion dates
    completedDates: [
        {
            type: Date
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Habit", habitSchema);
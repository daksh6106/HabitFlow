// =======================================
// HabitFlow - My Habits
// =======================================

const API_URL = "https://habitflow-backend-xu2r.onrender.com/api/habits";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

let habits = [];
let filteredHabits = [];

// ===============================
// Load Habits
// ===============================

async function loadHabits() {

    try {

        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        habits = data;
        filteredHabits = [...habits];

        renderHabits(filteredHabits);

    } catch (err) {

        console.log(err);

    }

}

// ===============================
// Render Habits
// ===============================

function renderHabits(list) {

    const habitList = document.getElementById("habitList");

    habitList.innerHTML = "";

    if (list.length === 0) {

        habitList.innerHTML = `
            <div class="empty-message">
                No Habits Found
            </div>
        `;

        return;
    }

    list.forEach(habit => {

        habitList.innerHTML += `

        <div class="habit-card">

            <div class="habit-top">

                <div class="habit-title">
                    ${habit.name}
                </div>

                <span class="status ${habit.completed ? "completed" : "pending"}">
                    ${habit.completed ? "Completed" : "Pending"}
                </span>

            </div>

            <div class="habit-description">
                ${habit.description || "No description"}
            </div>

            <div class="action-buttons">

                <button class="edit-btn"
                onclick="toggleHabit('${habit._id}',${habit.completed})">

                ${habit.completed ? "Mark Pending" : "Mark Complete"}

                </button>

                <button class="delete-btn"
                onclick="deleteHabit('${habit._id}')">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

// ===============================
// Toggle Complete
// ===============================

async function toggleHabit(id, completed) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({

                completed: !completed

            })

        });

        loadHabits();

    } catch (err) {

        console.log(err);

    }

}

// ===============================
// Delete Habit
// ===============================

async function deleteHabit(id) {

    if (!confirm("Delete this habit?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        loadHabits();

    } catch (err) {

        console.log(err);

    }

}

// ===============================
// Search
// ===============================

function searchHabit() {

    const value = document
        .getElementById("searchHabit")
        .value
        .toLowerCase();

    filteredHabits = habits.filter(h =>
        h.name.toLowerCase().includes(value)
    );

    renderHabits(filteredHabits);

}

// ===============================
// Filters
// ===============================

function showAllHabits() {

    filteredHabits = [...habits];

    renderHabits(filteredHabits);

}

function showCompletedHabits() {

    filteredHabits = habits.filter(h => h.completed);

    renderHabits(filteredHabits);

}

function showPendingHabits() {

    filteredHabits = habits.filter(h => !h.completed);

    renderHabits(filteredHabits);

}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

// ===============================
// Start
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadHabits();

});
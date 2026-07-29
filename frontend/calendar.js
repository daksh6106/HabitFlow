// =======================================
// HabitFlow Calendar JS
// =======================================

const API_URL = "https://habitflow-backend-xu2r.onrender.com";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

let habits = [];
let currentDate = new Date();

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

        renderCalendar();

    } catch (err) {

        console.log(err);

    }

}

// ===============================
// Calendar
// ===============================

function renderCalendar() {

    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.innerText = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty boxes

    for (let i = 0; i < firstDay; i++) {

        calendar.innerHTML += `
            <div class="day empty"></div>
        `;

    }

    let completedCount = 0;

    for (let day = 1; day <= totalDays; day++) {

        const date = new Date(year, month, day);

        let classes = "day";

        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            classes += " today";

        }

        // Completed Date

        const completed = habits.some(habit => {

            if (!habit.completedDates) return false;

            return habit.completedDates.some(d => {

                const cd = new Date(d);

                return (

                    cd.getDate() === day &&
                    cd.getMonth() === month &&
                    cd.getFullYear() === year

                );

            });

        });

        if (completed) {

            classes += " completed";

            completedCount++;

        }

        calendar.innerHTML += `
            <div class="${classes}">
                ${day}
            </div>
        `;

    }

    updateSummary(completedCount, totalDays);

}

// ===============================
// Summary
// ===============================

function updateSummary(completedDays, totalDays) {

    document.getElementById("completedDays").innerText = completedDays;

    document.getElementById("currentMonthHabits").innerText = habits.length;

    const percent = totalDays === 0
        ? 0
        : Math.round((completedDays / totalDays) * 100);

    document.getElementById("completionPercent").innerText =
        percent + "%";

}

// ===============================
// Month Buttons
// ===============================

document.getElementById("prevMonth").onclick = () => {

    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar();

};

document.getElementById("nextMonth").onclick = () => {

    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar();

};

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

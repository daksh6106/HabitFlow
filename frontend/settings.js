// =======================================
// HabitFlow Settings JS
// =======================================

// API URL
const API_URL = "http://localhost:5000/api/users";

// JWT Token
const token = localStorage.getItem("token");

// Elements
const themeToggle = document.getElementById("themeToggle");
const logoutBtn = document.getElementById("logoutBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");

// =======================================
// Check Login
// =======================================

if (!token) {
    window.location.href = "login.html";
}

// =======================================
// Theme
// =======================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {

    if (themeToggle.checked) {

        document.body.classList.add("light");
        localStorage.setItem("theme", "light");

    } else {

        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");

    }

});

// =======================================
// Load User
// =======================================

async function loadUser() {

    try {

        const res = await fetch(`${API_URL}/me`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await res.json();

        if (!res.ok) {

            alert(data.message || "Unable to load profile");
            return;

        }

        userName.value = data.name || "";
        userEmail.value = data.email || "";

    }

    catch (err) {

        console.error(err);
        alert("Server Error");

    }

}

loadUser();

// =======================================
// Change Password
// =======================================

changePasswordBtn.addEventListener("click", async () => {

    if (
        oldPassword.value.trim() === "" ||
        newPassword.value.trim() === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    try {

        const res = await fetch(`${API_URL}/change-password`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

body: JSON.stringify({

    currentPassword: oldPassword.value,
    newPassword: newPassword.value

})

        });

        const data = await res.json();

        if (!res.ok) {

            alert(data.message);
            return;

        }

        alert("Password changed successfully.");

        oldPassword.value = "";
        newPassword.value = "";

    }

    catch (err) {

        console.error(err);
        alert("Server Error");

    }

});

// =======================================
// Logout
// =======================================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});
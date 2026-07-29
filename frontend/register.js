const API_URL = "https://habitflow-backend-xu2r.onrender.com/api/users/register";

async function registerUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    message.innerHTML = "";

    if (name === "" || email === "" || password === "") {
        message.style.color = "#ff4d4d";
        message.innerHTML = "Please fill all fields.";
        return;
    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "#45E08D";
            message.innerHTML = "✅ Registration Successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {

            message.style.color = "#ff4d4d";
            message.innerHTML = data.message;

        }

    } catch (error) {

        console.log(error);

        message.style.color = "#ff4d4d";
        message.innerHTML = "Unable to connect to server.";

    }

}
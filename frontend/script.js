console.log("script loaded");

fetch("https://habitflow-backend-xu2r.onrender.com/api/test")
    .then(response => {
        console.log("Response received");
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById("message").innerHTML = data.message;
    })
    .catch(error => {
        console.log("Fetch Error:", error);
        document.getElementById("message").innerHTML = "Backend Not Connected";
    });
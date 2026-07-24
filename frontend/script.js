console.log("script loaded");

fetch("http://localhost:5000/api/test")
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
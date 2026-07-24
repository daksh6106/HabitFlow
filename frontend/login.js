const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        const res = await fetch("http://localhost:5000/api/users/login", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        if(res.ok){

            localStorage.setItem("token",data.token);

            alert("Login Successful");

            window.location.href="dashboard.html";

        }
        else{

            alert(data.message);

        }

    }

    catch(err){

        console.log(err);

        alert("Server Error");

    }

});
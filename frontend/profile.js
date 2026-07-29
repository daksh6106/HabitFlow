// ===================================
// HabitFlow Profile JS - Part 1
// ===================================


const USER_API = "https://habitflow-backend-xu2r.onrender.com/api/users/me";
const HABIT_API = "https://habitflow-backend-xu2r.onrender.com/api/habits";


const token = localStorage.getItem("token");


if(!token){

    alert("Please login first");

    window.location.href="login.html";

}



let profileHabits = [];




// ===================================
// Load Profile
// ===================================

async function loadProfile(){


    try{


        const response = await fetch(USER_API,{

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        });



        const user = await response.json();



        if(!response.ok){

            throw new Error(user.message);

        }




        document.getElementById("profileName")
        .innerHTML = user.name;



        document.getElementById("profileEmail")
        .innerHTML = user.email;




        document.getElementById("currentStreak")
        .innerHTML =
        user.currentStreak || 0;



        document.getElementById("longestStreak")
        .innerHTML =
        user.longestStreak || 0;




        if(user.createdAt){


            const date =
            new Date(user.createdAt);



            document.getElementById("joinedDate")
            .innerHTML =
            date.toLocaleDateString();


        }



    }


    catch(error){


        console.log(
            "Profile Error:",
            error
        );


    }


}





// ===================================
// Load Habit Statistics
// ===================================


async function loadHabitStats(){


    try{


        const response = await fetch(HABIT_API,{

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        });



        const habits =
        await response.json();



        profileHabits = habits;



        updateStats();


    }


    catch(error){


        console.log(
            "Habit Stats Error:",
            error
        );


    }


}// ===================================
// Update Statistics
// ===================================

function updateStats(){


    const total =
    profileHabits.length;



    const completed =
    profileHabits.filter(
        habit => habit.completed
    ).length;



    const progress =
    total === 0
    ? 0
    : Math.round(
        (completed / total) * 100
    );




    document.getElementById("totalHabits")
    .innerHTML = total;



    document.getElementById("completedHabits")
    .innerHTML = completed;



    document.getElementById("completionRate")
    .innerHTML =
    progress + "%";




    const fill =
    document.getElementById(
        "profileProgressFill"
    );



    if(fill){

        fill.style.width =
        progress + "%";

    }



    document.getElementById("progressText")
    .innerHTML =
    `${progress}% completed`;



}





// ===================================
// Theme Toggle
// ===================================

function toggleTheme(){


    document.body.classList.toggle("dark");



    const button =
    document.getElementById(
        "themeToggle"
    );



    if(
        document.body
        .classList
        .contains("dark")
    ){


        localStorage.setItem(
            "theme",
            "dark"
        );



        if(button){

            button.innerHTML =
            "☀ Light Mode";

        }


    }

    else{


        localStorage.setItem(
            "theme",
            "light"
        );



        if(button){

            button.innerHTML =
            "🌙 Dark Mode";

        }


    }


}





// ===================================
// Load Theme
// ===================================

function loadTheme(){


    const savedTheme =
    localStorage.getItem("theme");



    const button =
    document.getElementById(
        "themeToggle"
    );



    if(savedTheme === "dark"){


        document.body.classList.add(
            "dark"
        );



        if(button){

            button.innerHTML =
            "☀ Light Mode";

        }


    }


}





// ===================================
// Logout
// ===================================

function logout(){


    localStorage.removeItem(
        "token"
    );


    window.location.href =
    "login.html";


}





// ===================================
// Start
// ===================================

loadProfile();

loadHabitStats();

loadTheme();
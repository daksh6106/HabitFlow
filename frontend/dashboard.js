// =======================================
// HabitFlow Dashboard JS
// Clean Fixed Version
// =======================================


// ===============================
// API
// ===============================

const DASHBOARD_API_URL = "http://localhost:5000/api/habits";
const USER_API_URL = "http://localhost:5000/api/users/me";



const token = localStorage.getItem("token");


if(!token){

    alert("Please login first");

    window.location.href = "login.html";

}



let allHabits = [];

let currentFilter = "all";

let habitChart = null;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();



const habitContainer =
document.getElementById("habitList");





// ===============================
// Load User
// ===============================


async function loadUser(){


    try{


        const response =
        await fetch(USER_API_URL,{

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        });



        const user =
        await response.json();



        if(!response.ok){

            throw new Error(
                user.message
            );

        }



        const welcome =
        document.getElementById(
            "welcomeText"
        );



        if(welcome){

            welcome.innerHTML =
            `Good Morning, ${user.name} 👋`;

        }




        const streak =
        document.getElementById(
            "streak"
        );



        if(streak){

            streak.innerHTML =
            "🔥 " +
            (user.currentStreak || 0);

        }
        // Unlock Achievement Badges

if(user.achievements){

    if(user.achievements.some(a => a.name === "First Habit")){
        document.getElementById("badge1").classList.remove("locked");
        document.getElementById("badge1").classList.add("unlocked");
    }

    if(user.achievements.some(a => a.name === "10 Completed")){
        document.getElementById("badge2").classList.remove("locked");
        document.getElementById("badge2").classList.add("unlocked");
    }

    if(user.achievements.some(a => a.name === "25 Completed")){
        document.getElementById("badge3").classList.remove("locked");
        document.getElementById("badge3").classList.add("unlocked");
    }

    if(user.achievements.some(a => a.name === "Habit Master")){
        document.getElementById("badge4").classList.remove("locked");
        document.getElementById("badge4").classList.add("unlocked");
    }

}


    }


    catch(error){

        console.log(
            "User Error:",
            error
        );

    }


}






// ===============================
// Load Habits
// ===============================


async function loadHabits(){


    try{


        const response =
        await fetch(DASHBOARD_API_URL,{

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        });



        const data =
        await response.json();



        if(!response.ok){

            throw new Error(
                data.message ||
                "Habit loading failed"
            );

        }



        allHabits = data;



        applyCurrentFilter();


        generateCalendar();



    }


    catch(error){


        console.log(
            "Habit Load Error:",
            error
        );


        if(habitContainer){

            habitContainer.innerHTML =
            `
            <p>
            Unable to load habits
            </p>
            `;

        }


    }


}

// ===============================
// Render Habits
// ===============================
function renderHabits(habits){

    if(!habitContainer) return;

    habitContainer.innerHTML = "";

    if(habits.length === 0){

        habitContainer.innerHTML = `
            <p>No habits added yet 🚀</p>
        `;

        updateCards([]);
        return;
    }

    habits.forEach(habit=>{

        habitContainer.innerHTML += `

        <div class="habit">

            <input
                type="checkbox"
                ${habit.completed ? "checked" : ""}
                onchange="toggleHabit('${habit._id}', ${habit.completed})"
            >

            <div class="habit-info">

                <span>${habit.name}</span>

                <small>${habit.description || "No description"}</small>

            </div>

            <div class="habit-actions">

                <button onclick="editHabit('${habit._id}')">
                    ✏️
                </button>

                <button onclick="deleteHabit('${habit._id}')">
                    🗑️
                </button>

            </div>

        </div>

        `;

    });

    updateCards(habits);

}








// Update Dashboard Cards
// ===============================

function updateCards(habits){

    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;

    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalHabits").innerText = total;
    document.getElementById("completedHabits").innerText = completed;

    document.getElementById("progress").innerText = progress + "%";

    document.getElementById("progressFill").style.width = progress + "%";

    drawChart(completed, total - completed);

}






// ===============================
// Add Habit
// ===============================


function openHabitForm(){


    const form =
    document.getElementById(
        "habitForm"
    );



    if(!form)
    return;



    if(
        form.style.display==="none" ||
        form.style.display===""

    ){

        form.style.display="block";

    }

    else{

        form.style.display="none";

    }


}







async function addHabit(){


    const name =
    document.getElementById(
        "habitName"
    ).value;



    const description =
    document.getElementById(
        "habitDescription"
    ).value;



    if(name.trim()===""){

        alert(
            "Enter habit name"
        );

        return;

    }



    try{


        const response =
        await fetch(
            DASHBOARD_API_URL,
            {

                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json",


                    Authorization:
                    `Bearer ${token}`

                },


                body:JSON.stringify({

                    name,

                    description

                })

            }

        );



        const data =
        await response.json();



        if(!response.ok){

            alert(
                data.message
            );

            return;

        }



        document.getElementById(
            "habitName"
        ).value="";



        document.getElementById(
            "habitDescription"
        ).value="";



        loadHabits();



    }


    catch(error){

        console.log(
            error
        );

    }


}






// ===============================
// Toggle Habit
// ===============================


async function toggleHabit(id, status){

    try{

        const response = await fetch(`${DASHBOARD_API_URL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                completed: !status
            })
        });

        if(!response.ok){
            throw new Error("Update failed");
        }

        await loadHabits();
        await loadUser();

    }catch(error){
        console.error(error);
    }

}// ===============================
// Delete Habit
// ===============================


async function deleteHabit(id){


    const confirmDelete =
    confirm(
        "Delete this habit?"
    );



    if(!confirmDelete)
    return;




    try{


        await fetch(
            `${DASHBOARD_API_URL}/${id}`,
            {

                method:"DELETE",


                headers:{

                    Authorization:
                    `Bearer ${token}`

                }


            }

        );



        loadHabits();



    }


    catch(error){

        console.log(error);

    }


}







// ===============================
// Edit Habit
// ===============================


async function editHabit(id){


    const habit =
    allHabits.find(
        h=>h._id===id
    );



    if(!habit)
    return;



    const newName =
    prompt(
        "Edit Habit Name",
        habit.name
    );



    if(newName===null)
    return;




    const newDescription =
    prompt(
        "Edit Description",
        habit.description || ""
    );



    if(newDescription===null)
    return;






    try{


        await fetch(
            `${DASHBOARD_API_URL}/${id}`,
            {


                method:"PUT",


                headers:{


                    "Content-Type":
                    "application/json",


                    Authorization:
                    `Bearer ${token}`


                },


                body:JSON.stringify({

                    name:newName,

                    description:newDescription

                })


            }

        );



        loadHabits();



    }


    catch(error){

        console.log(error);

    }


}








// ===============================
// Search Habit
// ===============================


function searchHabit(){



    const value =
    document
    .getElementById(
        "searchHabit"
    )
    .value
    .toLowerCase();




    const filtered =
    allHabits.filter(

        habit=>

        habit.name
        .toLowerCase()
        .includes(value)

    );



    renderHabits(filtered);


}







// ===============================
// Filters
// ===============================


function showAllHabits(){


    currentFilter="all";


    renderHabits(
        allHabits
    );


}





function showCompletedHabits(){


    currentFilter="completed";


    renderHabits(

        allHabits.filter(

            habit=>
            habit.completed

        )

    );


}





function showPendingHabits(){


    currentFilter="pending";


    renderHabits(

        allHabits.filter(

            habit=>
            !habit.completed

        )

    );


}





function applyCurrentFilter(){


    if(currentFilter==="completed"){


        showCompletedHabits();


    }

    else if(currentFilter==="pending"){


        showPendingHabits();


    }

    else{


        renderHabits(
            allHabits
        );


    }


}







// ===============================
// Chart
// ===============================


function drawChart(completed,pending){


    const canvas =
    document.getElementById(
        "habitChart"
    );



    if(!canvas)
    return;




    if(habitChart){

        habitChart.destroy();

    }





    habitChart =
    new Chart(

        canvas,

        {

            type:"doughnut",

            data:{


                labels:[

                    "Completed",

                    "Pending"

                ],


                datasets:[{


                    data:[

                        completed,

                        pending

                    ],



                    backgroundColor:[

                        "#45E08D",

                        "#FF5C5C"

                    ]


                }]


            },


            options:{
responsive:true,
cutout:"70%",
plugins:{
legend:{
position:"bottom"
}
}
}


        }

    );



}// ===============================
// Calendar
// ===============================


function generateCalendar() {

    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");

    if (!calendar) return;

    calendar.innerHTML = "";

    const today = new Date();

    monthYear.innerHTML = new Date(
        currentYear,
        currentMonth
    ).toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {

        calendar.innerHTML += `<div class="day empty"></div>`;

    }

    let completedDays = 0;

    for (let day = 1; day <= totalDays; day++) {

        let className = "day";

        const currentDate = new Date(currentYear, currentMonth, day);
        currentDate.setHours(0, 0, 0, 0);

        const completed = allHabits.some(habit => {

            if (!habit.completedDates) return false;

            return habit.completedDates.some(date => {

                const d = new Date(date);
                d.setHours(0, 0, 0, 0);

                return d.getTime() === currentDate.getTime();

            });

        });

        if (completed) {

            className += " completed";
            completedDays++;

        }

        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {

            className += " today";

        }

        calendar.innerHTML += `
            <div class="${className}" onclick="showDayDetails('${currentDate.toISOString()}')">
                ${day}
            </div>
        `;

    }

    document.getElementById("completedDaysMonth").innerText = completedDays;

    const percent = Math.round((completedDays / totalDays) * 100);

    document.getElementById("completionRate").innerText = percent + "%";

    const streak = document.getElementById("streak").innerText;

    document.getElementById("currentStreakCard").innerText = streak;

}
function showDayDetails(date){

    const habits = allHabits.filter(habit => {

        if(!habit.completedDates) return false;

        return habit.completedDates.some(d=>{

            const x=new Date(d);
            const y=new Date(date);

            x.setHours(0,0,0,0);
            y.setHours(0,0,0,0);

            return x.getTime()===y.getTime();

        });

    });

    if(habits.length===0){

        alert("No habits completed on this day.");

        return;

    }

    alert(
        habits.map(h=>"✅ "+h.name).join("\n")
    );

}







// ===============================
// Theme Toggle
// ===============================


function toggleTheme(){



    document.body.classList.toggle(
        "light"
    );



    const button =
    document.getElementById(
        "themeToggle"
    );




    if(
        document.body.classList.contains(
            "light"
        )
    ){


        localStorage.setItem(
            "theme",
            "light"
        );



        if(button)
        button.innerHTML =
        "☀ Dark Mode";


    }

    else{


        localStorage.setItem(
            "theme",
            "dark"
        );



        if(button)
        button.innerHTML =
        "🌙 Light Mode";


    }



}








function loadTheme(){


    const saved =
    localStorage.getItem(
        "theme"
    );



    const button =
    document.getElementById(
        "themeToggle"
    );



    if(saved==="light"){


        document.body.classList.add(
            "light"
        );



        if(button)
        button.innerHTML =
        "☀ Dark Mode";


    }


}







// ===============================
// Logout
// ===============================


function logout(){



    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );



    if(confirmLogout){


        localStorage.removeItem(
            "token"
        );



        window.location.href =
        "login.html";


    }


}







// ===============================
// Start Dashboard
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    loadTheme();

    await loadUser();

    await loadHabits();

    generateCalendar();

    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;
                currentYear--;

            }

            generateCalendar();

        });

    }

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;
                currentYear++;

            }

            generateCalendar();

        });

    }

});
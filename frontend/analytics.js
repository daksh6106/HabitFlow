// =======================================
// HabitFlow Analytics JS
// =======================================


const ANALYTICS_API_URL = "https://habitflow-backend-xu2r.onrender.com/api/habits";


const token = localStorage.getItem("token");


if(!token){

    alert("Please login first");
    window.location.href="login.html";

}


let analyticsHabits = [];

let pieChart = null;
let barChart = null;



// ===============================
// Load Analytics Data
// ===============================

async function loadAnalytics(){


    try{


        const response = await fetch(
            ANALYTICS_API_URL,
            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }
        );


        const data = await response.json();



        if(!response.ok){

            throw new Error(data.message);

        }



        analyticsHabits = data;

updateAnalyticsCards();

updateSummaries();

createCalendar();

createCharts();
    }


    catch(error){

        console.log(
            "Analytics Error:",
            error
        );

    }


}






// ===============================
// Cards
// ===============================


function updateAnalyticsCards(){


    let total =
    analyticsHabits.length;



    let completed =
    analyticsHabits.filter(
        h=>h.completed
    ).length;



    let pending =
    total-completed;



    let rate =
    total===0
    ?
    0
    :
    Math.round(
        (completed/total)*100
    );




    document.getElementById(
        "totalHabits"
    ).innerText=total;



    document.getElementById(
        "completedHabits"
    ).innerText=completed;



    document.getElementById(
        "pendingHabits"
    ).innerText=pending;



    document.getElementById(
        "completionRate"
    ).innerText=rate+"%";



}
// ===============================
// Weekly & Monthly Summary
// ===============================

function updateSummaries() {

    const today = new Date();

    today.setHours(0,0,0,0);

    const weekAgo = new Date(today);

    weekAgo.setDate(today.getDate() - 6);

    const month = today.getMonth();
    const year = today.getFullYear();

    let weekCompleted = 0;
    let monthCompleted = 0;

    analyticsHabits.forEach(habit => {

        if (!habit.completedDates) return;

        habit.completedDates.forEach(date => {

            const d = new Date(date);

            d.setHours(0,0,0,0);

            // Weekly

            if (d >= weekAgo && d <= today) {

                weekCompleted++;

            }

            // Monthly

            if (
                d.getMonth() === month &&
                d.getFullYear() === year
            ) {

                monthCompleted++;

            }

        });

    });

    const weekTotal = analyticsHabits.length * 7;

    const monthDays = new Date(year, month + 1, 0).getDate();

    const monthTotal = analyticsHabits.length * monthDays;

    const weekMissed = Math.max(0, weekTotal - weekCompleted);

    const monthMissed = Math.max(0, monthTotal - monthCompleted);

    const weekRate = weekTotal === 0
        ? 0
        : Math.round((weekCompleted / weekTotal) * 100);

    const monthRate = monthTotal === 0
        ? 0
        : Math.round((monthCompleted / monthTotal) * 100);

    document.getElementById("weekCompleted").innerText = weekCompleted;
    document.getElementById("weekMissed").innerText = weekMissed;
    document.getElementById("weekSuccess").innerText = weekRate + "%";

    document.getElementById("monthCompleted").innerText = monthCompleted;
    document.getElementById("monthMissed").innerText = monthMissed;
    document.getElementById("monthSuccess").innerText = monthRate + "%";

}






// ===============================
// Calendar
// ===============================


function createCalendar(){


    const calendar =
    document.getElementById(
        "calendar"
    );


    if(!calendar)
    return;



    calendar.innerHTML="";
    const weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

weekDays.forEach(day=>{

    calendar.innerHTML+=`
        <div class="week-day">${day}</div>
    `;

});



    const today =
    new Date();



    const year =
    today.getFullYear();


    const month =
    today.getMonth();



    const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();



    const days =
    new Date(
        year,
        month+1,
        0
    ).getDate();

    // Empty boxes before first day
for(let i = 0; i < firstDay; i++){

    calendar.innerHTML += `
        <div class="day empty"></div>
    `;

}




    for(let d=1; d<=days; d++){

    let cls="day";

    const currentDate=new Date(year,month,d);
    currentDate.setHours(0,0,0,0);

    const completed=analyticsHabits.some(habit=>{

        return habit.completedDates &&
        habit.completedDates.some(date=>{

            const cd=new Date(date);
            cd.setHours(0,0,0,0);

            return cd.getTime()===currentDate.getTime();

        });

    });

    if(completed){
        cls+=" completed ";
    }

    const todayDate = new Date();

if (
    currentDate.getDate() === todayDate.getDate() &&
    currentDate.getMonth() === todayDate.getMonth() &&
    currentDate.getFullYear() === todayDate.getFullYear()
){
    cls += " today";
}

    calendar.innerHTML+=`
        <div class="${cls}">
            ${d}
        </div>
    `;

}
}







// ===============================
// Charts
// ===============================


function createCharts(){

    const completed = analyticsHabits.filter(h=>h.completed).length;
    const pending = analyticsHabits.length - completed;

    // ================= PIE CHART =================

    const pie = document.getElementById("pieChart");

    if(pie){

        if(pieChart){
            pieChart.destroy();
        }

        pieChart = new Chart(pie,{

            type:"doughnut",

            data:{
                labels:["Completed","Pending"],
                datasets:[{
                    data:[completed,pending],
                    backgroundColor:["#45E08D","#FF5C5C"],
                    borderWidth:0
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

        });

    }

    // ================= BAR CHART =================

    const bar = document.getElementById("barChart");

    if(bar){

        if(barChart){
            barChart.destroy();
        }

        const weekLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        const weekData = [0,0,0,0,0,0,0];

        analyticsHabits.forEach(habit=>{

            if(!habit.completedDates) return;
habit.completedDates.forEach(date=>{

    const d = new Date(date);

    const now = new Date();

    const start = new Date();

    start.setDate(now.getDate()-6);

    if(d < start || d > now) return;

    let day = d.getDay();

    day = day===0 ? 6 : day-1;

    weekData[day]++;

});

        });

        barChart = new Chart(bar,{

            type:"bar",

            data:{
                labels:weekLabels,
                datasets:[{
                    label:"Completed Habits",
                    data:weekData,
                    backgroundColor:"#45E08D",
                    borderRadius:8
                }]
            },

            options:{
                responsive:true,
                plugins:{
                    legend:{
                        display:false
                    }
                },
                scales:{
                    y:{
                        beginAtZero:true,
                        ticks:{
                            stepSize:1
                        }
                    }
                }
            }

        });

    }

}









// ===============================
// Theme
// ===============================


const themeBtn =
document.getElementById(
    "themeToggle"
);



if(themeBtn){


    themeBtn.onclick=function(){


        document.body.classList.toggle(
            "light"
        );


        localStorage.setItem(
            "theme",
            document.body.classList.contains("light")
            ?
            "light"
            :
            "dark"
        );


    };


}





function loadTheme(){


    if(
        localStorage.getItem("theme")
        ===
        "light"
    ){

        document.body.classList.add(
            "light"
        );

    }


}





// ===============================
// Logout
// ===============================


function logout(){


    localStorage.removeItem(
        "token"
    );


    window.location.href=
    "login.html";


}





// ===============================
// Start
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadTheme();


    loadAnalytics();


});
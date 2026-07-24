const User = require("../models/user");


async function updateUserStreak(userId) {

    const user = await User.findById(userId);

    if (!user) return;


    const today = new Date();
    today.setHours(0,0,0,0);



    // First completion ever
    if (!user.lastActiveDate) {

        user.currentStreak = 1;
        user.longestStreak = 1;
        user.lastActiveDate = today;


        checkAchievements(user);


        await user.save();

        return;
    }



    const lastDate = new Date(user.lastActiveDate);

    lastDate.setHours(0,0,0,0);



    const diffDays = Math.floor(
        (today - lastDate) /
        (1000 * 60 * 60 * 24)
    );



    // Same day
    if(diffDays === 0){

        return;

    }



    // Consecutive day
    if(diffDays === 1){

        user.currentStreak += 1;

    }

    else{

        user.currentStreak = 1;

    }



    // Update longest streak

    if(user.currentStreak > user.longestStreak){

        user.longestStreak = user.currentStreak;

    }



    user.lastActiveDate = today;



    // Check Achievements

    checkAchievements(user);



    await user.save();


}





// ===============================
// Achievement Checker
// ===============================

function checkAchievements(user){



    if(!user.achievements){

        user.achievements = [];

    }



    // 7 Day Streak

    if(
        user.currentStreak >= 7 &&
        !user.achievements.some(
            a => a.name === "7 Day Streak"
        )
    ){

        user.achievements.push({

            name:"7 Day Streak"

        });

    }




    // 30 Day Streak

    if(
        user.currentStreak >= 30 &&
        !user.achievements.some(
            a => a.name === "30 Day Streak"
        )
    ){

        user.achievements.push({

            name:"30 Day Streak"

        });

    }



}
// ===============================
// Habit Achievement Checker
// ===============================

async function checkHabitAchievements(userId){

    const Habit = require("../models/Habit");

    const user = await User.findById(userId);

    if(!user) return;


    const habits = await Habit.find({
        user:userId
    });


    const totalHabits = habits.length;


    const completedHabits = habits.filter(
        habit=>habit.completed
    ).length;



    if(!user.achievements){

        user.achievements = [];

    }



    // First Habit Created

    if(
        totalHabits >= 1 &&
        !user.achievements.some(
            a=>a.name==="First Habit"
        )
    ){

        user.achievements.push({

            name:"First Habit"

        });

    }

    // 10 Completed

if (
    completedHabits >= 10 &&
    !user.achievements.some(a => a.name === "10 Completed")
) {
    user.achievements.push({
        name: "10 Completed"
    });
}

// 25 Completed

if (
    completedHabits >= 25 &&
    !user.achievements.some(a => a.name === "25 Completed")
) {
    user.achievements.push({
        name: "25 Completed"
    });
}

    // Habit Master

    if(
        completedHabits >= 100 &&
        !user.achievements.some(
            a=>a.name==="Habit Master"
        )
    ){

        user.achievements.push({

            name:"Habit Master"

        });

    }



    await user.save();

}


module.exports.checkHabitAchievements =
checkHabitAchievements;



module.exports = {
    updateUserStreak,
    checkHabitAchievements
};
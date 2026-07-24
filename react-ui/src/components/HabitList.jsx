import { useState } from "react";

function HabitList() {
  const [habits] = useState([
    "🏋️ Workout",
    "📚 Read Book",
    "💧 Drink Water",
    "💻 Coding"
  ]);

  return (
    <div>
      <h2>My Habits</h2>

      <ul>
        {habits.map((habit, index) => (
          <li key={index}>{habit}</li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
import { useState } from "react";

function HabitInput() {
  const [habit, setHabit] = useState("");

  return (
    <div>
      <h2>Add Habit</h2>

      <input
        type="text"
        placeholder="Enter Habit"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />

      <p>Your Habit: {habit}</p>
    </div>
  );
}

export default HabitInput;
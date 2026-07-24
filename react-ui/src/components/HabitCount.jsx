import { useState } from "react";

function HabitCount() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Today's Habits</h3>

      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Complete Habit
      </button>
    </div>
  );
}

export default HabitCount;
import { useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <div>
      <h2>Theme</h2>

      <button onClick={() => setDark(!dark)}>
        {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;
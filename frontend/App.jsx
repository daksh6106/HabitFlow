import { useState, useMemo } from "react";
import {
  CheckCircle2,
  Flame,
  BarChart3,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

const HABITS = [
  "Morning run",
  "Read 20 pages",
  "Drink 2L water",
  "Meditate",
  "No sugar",
  "Journal",
  "Stretch",
  "Sleep by 11",
];

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Daily Tracking",
    desc: "Check off your habits with one tap and watch the day fill in.",
  },
  {
    icon: Flame,
    title: "Streak Counter",
    desc: "Every unbroken day stacks the flame higher. Don't let it go out.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Weekly and monthly reports that show where you're actually consistent.",
  },
  {
    icon: CalendarDays,
    title: "Calendar",
    desc: "A full grid of every day you showed up, at a glance.",
  },
];

const STATS = [
  { value: "10K+", label: "Habits Tracked" },
  { value: "2K+", label: "Active Users" },
  { value: "95%", label: "User Satisfaction" },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    quote:
      "This app completely changed my daily routine. The streak feature keeps me motivated every day.",
  },
  {
    name: "Priya Singh",
    quote: "Beautiful UI and very easy to use. Perfect habit tracking website.",
  },
  {
    name: "Aman Verma",
    quote: "I never miss my workout now. Highly recommended.",
  },
];

// 6 weeks x 7 days mini contribution-style grid for the hero card
const WEEKS = 6;
const DAYS = 7;

function seedGrid() {
  const grid = [];
  for (let w = 0; w < WEEKS; w++) {
    const row = [];
    for (let d = 0; d < DAYS; d++) {
      // deterministic pseudo-random fill so it looks alive but stable
      const seed = (w * 7 + d) * 2654435761 % 5;
      row.push(seed > 1 ? 1 : seed === 1 ? 0.5 : 0);
    }
    grid.push(row);
  }
  // make sure the last cell (today) starts unchecked so it's interactive
  grid[WEEKS - 1][DAYS - 1] = 0;
  return grid;
}

export default function HabitFlow() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState(() =>
    HABITS.map((_, i) => i < 6)
  );
  const [grid] = useState(seedGrid);

  const completed = checked.filter(Boolean).length;
  const pct = Math.round((completed / HABITS.length) * 100);
  const streak = 15;

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(var(--accent) ${pct}%, var(--ring-track) ${pct}% 100%)`,
    }),
    [pct]
  );

  function toggleHabit(i) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="hf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .hf-root {
          --paper: #f4f6f1;
          --paper-raised: #ffffff;
          --ink: #1e2a22;
          --ink-soft: #52604f;
          --line: #d7ddce;
          --primary: #3c6a4c;
          --primary-dark: #2a4d37;
          --accent: #e2a63e;
          --ring-track: #e4e9dc;
          --radius: 14px;
          font-family: 'Inter', sans-serif;
          background: var(--paper);
          color: var(--ink);
          line-height: 1.5;
          overflow-x: hidden;
        }
        .hf-root * { box-sizing: border-box; }
        .hf-root h1, .hf-root h2, .hf-root h3 {
          font-family: 'Fraunces', serif;
          color: var(--ink);
          margin: 0;
        }
        .hf-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        /* NAV */
        .hf-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 6%;
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 0;
          background: rgba(244,246,241,0.9);
          backdrop-filter: blur(8px);
          z-index: 20;
        }
        .hf-logo {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 22px;
          letter-spacing: -0.02em;
        }
        .hf-logo::before {
          content: '✓';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          margin-right: 8px;
          background: var(--primary);
          color: #fff;
          border-radius: 7px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        }
        .hf-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hf-nav-links a {
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .hf-nav-links a:hover { color: var(--primary-dark); }
        .hf-btn-nav {
          background: var(--primary);
          color: #fff !important;
          padding: 9px 18px;
          border-radius: 999px;
        }
        .hf-btn-nav:hover { background: var(--primary-dark) !important; }
        .hf-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink);
        }

        /* HERO */
        .hf-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          padding: 80px 6% 60px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .hf-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary-dark);
          background: #e3ead9;
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .hf-hero h1 {
          font-size: 52px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
        }
        .hf-hero p {
          margin-top: 20px;
          font-size: 17px;
          color: var(--ink-soft);
          max-width: 460px;
        }
        .hf-buttons { display: flex; gap: 14px; margin-top: 32px; }
        .hf-btn-primary, .hf-btn-secondary {
          padding: 13px 26px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .hf-btn-primary {
          background: var(--primary);
          color: #fff;
        }
        .hf-btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }
        .hf-btn-secondary {
          background: transparent;
          color: var(--ink);
          border-color: var(--line);
        }
        .hf-btn-secondary:hover { border-color: var(--ink-soft); }

        /* Dashboard card / signature element */
        .hf-card {
          background: var(--paper-raised);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 20px 50px -30px rgba(30,42,34,0.35);
        }
        .hf-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hf-card-top h3 {
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
        }
        .hf-streak-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
        }
        .hf-ring-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 22px 0 20px;
        }
        .hf-ring {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hf-ring-inner {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--paper-raised);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 18px;
        }
        .hf-habit-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .hf-habit-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--ink-soft);
        }
        .hf-habit-row.done { color: var(--ink); }
        .hf-check {
          width: 15px;
          height: 15px;
          border-radius: 4px;
          border: 1.5px solid var(--line);
          flex-shrink: 0;
        }
        .hf-habit-row.done .hf-check {
          background: var(--primary);
          border-color: var(--primary);
        }
        .hf-grid-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-soft);
          margin-bottom: 10px;
        }
        .hf-week-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 5px;
        }
        .hf-day-col {
          display: grid;
          grid-template-rows: repeat(7, 1fr);
          gap: 5px;
        }
        .hf-day-cell {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 4px;
          background: var(--ring-track);
          cursor: default;
          transition: transform 0.1s ease;
        }
        .hf-day-cell.interactive { cursor: pointer; }
        .hf-day-cell.interactive:hover { transform: scale(1.15); }

        /* FEATURES */
        .hf-section { padding: 90px 6%; max-width: 1280px; margin: 0 auto; }
        .hf-section-head { max-width: 560px; margin-bottom: 48px; }
        .hf-section-head .hf-eyebrow { margin-bottom: 14px; }
        .hf-section-head h2 { font-size: 34px; font-weight: 600; letter-spacing: -0.01em; }
        .hf-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .hf-feature-card {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 26px 22px;
          background: var(--paper-raised);
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .hf-feature-card:hover {
          border-color: var(--primary);
          transform: translateY(-3px);
        }
        .hf-feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #e3ead9;
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .hf-feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
        .hf-feature-card p { font-size: 14px; color: var(--ink-soft); margin: 0; }

        /* ABOUT */
        .hf-about {
          background: var(--primary-dark);
          color: #f4f6f1;
          border-radius: 28px;
          margin: 0 6% 20px;
          padding: 64px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .hf-about h2 {
          color: #fff;
          font-size: 32px;
          font-weight: 600;
          max-width: 420px;
        }
        .hf-about p {
          color: #cfe0d1;
          margin-top: 16px;
          max-width: 420px;
          font-size: 15px;
        }
        .hf-about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hf-about-card h1 {
          font-family: 'IBM Plex Mono', monospace;
          color: var(--accent);
          font-size: 34px;
          font-weight: 600;
        }
        .hf-about-card p {
          color: #cfe0d1;
          font-size: 13px;
          margin-top: 6px;
        }

        /* TESTIMONIALS */
        .hf-testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .hf-testimonial-card {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 26px;
          background: var(--paper-raised);
        }
        .hf-testimonial-card p {
          font-size: 14.5px;
          color: var(--ink-soft);
          margin: 12px 0 0;
        }
        .hf-testimonial-card h3 {
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }
        .hf-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          margin-right: 10px;
          vertical-align: middle;
        }

        /* FOOTER */
        .hf-footer {
          border-top: 1px solid var(--line);
          padding: 48px 6% 32px;
          text-align: center;
        }
        .hf-footer h2 { font-size: 22px; font-weight: 600; }
        .hf-footer p { color: var(--ink-soft); font-size: 14px; margin: 6px 0 0; }

        @media (max-width: 900px) {
          .hf-nav-links { display: none; }
          .hf-menu-toggle { display: block; }
          .hf-hero { grid-template-columns: 1fr; padding-top: 48px; }
          .hf-hero h1 { font-size: 38px; }
          .hf-cards { grid-template-columns: 1fr 1fr; }
          .hf-about { grid-template-columns: 1fr; padding: 40px 26px; }
          .hf-about-stats { grid-template-columns: repeat(3, 1fr); }
          .hf-testimonial-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .hf-cards { grid-template-columns: 1fr; }
          .hf-about-stats { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hf-root * { transition: none !important; }
        }

        .hf-nav-links a:focus-visible,
        .hf-btn-primary:focus-visible,
        .hf-btn-secondary:focus-visible,
        .hf-day-cell.interactive:focus-visible {
          outline: 2px solid var(--primary-dark);
          outline-offset: 2px;
        }
      `}</style>

      {/* NAV */}
      <nav className="hf-nav">
        <div className="hf-logo">HabitFlow</div>
        <ul className="hf-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#" className="hf-btn-nav">Register</a></li>
        </ul>
        <button
          className="hf-menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {menuOpen && (
        <ul
          className="hf-nav-links"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "20px 6%",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <li><a href="#">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#" className="hf-btn-nav">Register</a></li>
        </ul>
      )}

      {/* HERO */}
      <section className="hf-hero">
        <div>
          <span className="hf-eyebrow">Day {WEEKS * DAYS - 6} of showing up</span>
          <h1>Build Better Habits, Every Single Day.</h1>
          <p>
            HabitFlow helps you build productive habits, maintain streaks and
            visualize your progress using a beautiful dashboard.
          </p>
          <div className="hf-buttons">
            <a href="#" className="hf-btn-primary">Start Tracking</a>
            <a href="#features" className="hf-btn-secondary">Learn More</a>
          </div>
        </div>

        <div className="hf-card">
          <div className="hf-card-top">
            <h3>Today's Progress</h3>
            <span className="hf-streak-pill"><Flame size={15} />{streak}</span>
          </div>

          <div className="hf-ring-wrap">
            <div className="hf-ring" style={ringStyle}>
              <div className="hf-ring-inner">{pct}%</div>
            </div>
            <div className="hf-habit-list">
              {HABITS.slice(0, 3).map((h, i) => (
                <div key={h} className={`hf-habit-row ${checked[i] ? "done" : ""}`}>
                  <span className="hf-check" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          <div className="hf-grid-label">Tap today's cell to check in</div>
          <div className="hf-week-grid">
            {grid.map((week, w) => (
              <div className="hf-day-col" key={w}>
                {week.map((v, d) => {
                  const isToday = w === WEEKS - 1 && d === DAYS - 1;
                  const opacity = isToday
                    ? completed / HABITS.length
                    : v;
                  return (
                    <div
                      key={d}
                      role={isToday ? "button" : undefined}
                      tabIndex={isToday ? 0 : undefined}
                      className={`hf-day-cell ${isToday ? "interactive" : ""}`}
                      style={{
                        background:
                          opacity === 0
                            ? "var(--ring-track)"
                            : `color-mix(in srgb, var(--primary) ${opacity * 100}%, var(--ring-track))`,
                      }}
                      onClick={
                        isToday
                          ? () => toggleHabit(HABITS.length - 1)
                          : undefined
                      }
                      onKeyDown={
                        isToday
                          ? (e) => e.key === "Enter" && toggleHabit(HABITS.length - 1)
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="hf-section">
        <div className="hf-section-head">
          <span className="hf-eyebrow">Why HabitFlow</span>
          <h2>Everything you need to stay consistent</h2>
        </div>
        <div className="hf-cards">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div className="hf-feature-card" key={title}>
              <div className="hf-feature-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="hf-about">
        <div>
          <h2>Transform Your Daily Routine</h2>
          <p>
            HabitFlow helps students and professionals build consistency
            through simple habit tracking, beautiful dashboards and progress
            visualization.
          </p>
        </div>
        <div className="hf-about-stats">
          {STATS.map((s) => (
            <div className="hf-about-card" key={s.label}>
              <h1>{s.value}</h1>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="hf-section">
        <div className="hf-section-head">
          <span className="hf-eyebrow">Testimonials</span>
          <h2>What our users say</h2>
        </div>
        <div className="hf-testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div className="hf-testimonial-card" key={t.name}>
              <div>
                <span className="hf-avatar">{t.name.charAt(0)}</span>
                <h3 style={{ display: "inline" }}>{t.name}</h3>
              </div>
              <p>"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hf-footer">
        <h2>HabitFlow</h2>
        <p>Build Better Habits Every Day.</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}
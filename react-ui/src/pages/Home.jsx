import Welcome from "../components/Welcome";
import UserCard from "../components/UserCard";
import HabitCount from "../components/HabitCount";
import ThemeToggle from "../components/ThemeToggle";
import HabitInput from "../components/HabitInput";
import TodayDate from "../components/TodayDate";
import HabitList from "../components/HabitList";
import Clock from "../components/Clock";
import Quote from "../components/Quote";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🏠 Home Page</h2>

      <Welcome />
      <hr />

      <UserCard />
      <hr />

      <HabitCount />
      <hr />

      <ThemeToggle />
      <hr />

      <HabitInput />
      <hr />

      <TodayDate />
      <hr />

      <HabitList />
      <hr />

      <Clock />
      <hr />

      <Quote />
    </div>
  );
}

export default Home;
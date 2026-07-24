function TodayDate() {
  return (
    <div>
      <h2>Today's Date</h2>

      <h3>{new Date().toDateString()}</h3>
    </div>
  );
}

export default TodayDate;
function Clock() {
  return (
    <div>
      <h2>Current Time</h2>

      <h3>{new Date().toLocaleTimeString()}</h3>
    </div>
  );
}

export default Clock;
import React from "react";

function TestPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "red" }}>🔥 React is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <p>
        Backend API:{" "}
        <a href="http://localhost:5000/health" target="_blank">
          Test Backend
        </a>
      </p>
    </div>
  );
}

export default TestPage;

import React from "react";
import "./App.css";
import LoginRegisterForm from "./LoginRegisterForm";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#ff914d", height: "100vh" }}
    >
      <img className="Logo" src="https://i.imgur.com/kDW7dcm.png" />
      <h1> Find Someone To Taco-Bout It With </h1>
      <LoginRegisterForm />
    </div>
  );
}

export default App;

import React from "react";
import LoginRegisterForm from "../LoginRegisterForm";

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <img className="Logo" src="https://i.imgur.com/kDW7dcm.png" />
        <h1> Find Someone To Taco-Bout It With 🌮 </h1>
        <LoginRegisterForm />
        <footer>Made with love by Taiga Lee 💕</footer>
      </div>
    );
  }
}

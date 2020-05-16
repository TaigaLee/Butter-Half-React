import React from "react";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

export default class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      name: "",
      location: "",
      age: "",
      bio: "",
      action: "Login",
      chatUsername: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.action === "Register") {
      this.props.register(this.state);
    } else {
      this.props.login(this.state);
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  switchForm = () => {
    if (this.state.action === "Login") {
      this.setState({ action: "Register" });
    } else {
      this.setState({ action: "Login" });
    }
  };

  render() {
    return (
      <div>
        <img
          className="Logo"
          src="https://i.imgur.com/kDW7dcm.png"
          alt="logo"
        />
        <h1 style={{ fontFamily: "Advent Pro", fontSize: "3.6rem" }}>
          {" "}
          Find Someone To Taco-Bout It With 🌮{" "}
        </h1>
        {this.state.action === "Login" ? (
          <LoginForm
            switchForm={this.switchForm}
            email={this.state.email}
            password={this.state.password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        ) : (
          <RegisterForm
            switchForm={this.switchForm}
            handleSubmit={this.handleSubmit}
            email={this.state.email}
            name={this.state.name}
            password={this.state.password}
            location={this.state.location}
            age={this.state.age}
            bio={this.state.bio}
            handleChange={this.handleChange}
          />
        )}
        <footer>Made with love by Taiga Lee 💕</footer>
      </div>
    );
  }
}

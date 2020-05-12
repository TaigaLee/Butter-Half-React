import React from "react";
import "./App.css";
import HomePage from "./HomePage";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      loggedInUser: "",
    };
  }
  register = async (registerInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/auth/register";

      const registerResponse = await fetch(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(registerInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const registerResponseJson = await registerResponse.json();

      console.log(registerResponseJson);

      console.log("REGISTER FUNCTION");
      if (registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUser: registerResponseJson.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  login = async (loginInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/auth/login";

      const loginResponse = await fetch(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const loginResponseJson = await loginResponse.json();

      console.log(loginResponseJson);

      if (loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUser: loginResponseJson.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/auth/logout";

      const logoutResponse = await fetch(url, {
        credentials: "include",
      });

      if (logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div
        className="App"
        style={{ backgroundColor: "#ff914d", height: "100vh" }}
      >
        <HomePage
          register={this.register}
          login={this.login}
          logout={this.logout}
        />
      </div>
    );
  }
}

import React from "react";
import "./App.css";
import HomePage from "./HomePage";
import SetUpForm from "./SetUpForm";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      loggedInUser: "",
      needsToBeSetUp: false,
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

      if (registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUser: registerResponseJson.data,
          needsToBeSetUp: true,
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

      if (loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUser: loginResponseJson.data,
          needsToBeSetUp: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  switchNeedsToBeSetUp = () => {
    if (this.state.needsToBeSetUp === true) {
      this.setState({
        needsToBeSetUp: false,
      });
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

  updateUser = async (updatedUserInfo) => {
    const url = process.env.REACT_APP_API_URL + "/user/edit";

    try {
      const updateUserResponse = await fetch(url, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(updatedUserInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedUserJson = await updateUserResponse.json();

      if (updatedUserJson.status === 200) {
        this.setState({
          loggedInUser: updatedUserJson.data,
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
        {this.state.needsToBeSetUp ? (
          <SetUpForm
            updateUser={this.updateUser}
            loggedInUser={this.state.loggedInUser}
            switchNeedsToBeSetUp={this.switchNeedsToBeSetUp}
          />
        ) : (
          <HomePage
            register={this.register}
            login={this.login}
            logout={this.logout}
          />
        )}
      </div>
    );
  }
}

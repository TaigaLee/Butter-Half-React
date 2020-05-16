import React from "react";
import "./App.css";
import HomePage from "./HomePage";
import SetUpForm from "./SetUpForm";
import Dashboard from "./Dashboard";
import ChatApp from "./CometChat/src/defaultPages/ChatApp";
import { CometChat } from "@cometchat-pro/chat";

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
      console.log("clicked");
      const url = process.env.REACT_APP_API_URL + "/auth/logout";

      const logoutResponse = await fetch(url, {
        credentials: "include",
      });

      const logoutResponseJson = await logoutResponse.json();

      if (logoutResponseJson.status === 200) {
        this.setState({
          loggedIn: false,
        });
      }
      CometChat.logout().then(
        (success) => {
          console.log("logout completed successfully");
        },
        (error) => {
          console.log("Logout failed", { error });
        }
      );
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

  deleteUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/user/";

      const deleteUserResponse = await fetch(url, {
        credentials: "include",
        method: "DELETE",
      });

      const deletedUserJson = await deleteUserResponse.json();

      console.log(deletedUserJson);

      if (deletedUserJson.status === 200) {
        this.setState({
          loggedInUser: "",
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
        {this.state.needsToBeSetUp ? (
          <SetUpForm
            updateUser={this.updateUser}
            loggedInUser={this.state.loggedInUser}
            switchNeedsToBeSetUp={this.switchNeedsToBeSetUp}
          />
        ) : this.state.loggedIn ? (
          <Dashboard
            loggedInUser={this.state.loggedInUser}
            deleteUser={this.deleteUser}
            logout={this.logout}
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

import React from "react";
import { Button, Grid, Header, Message, Divider } from "semantic-ui-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RequestsDashboard from "../RequestsDashboard";
import EditUserForm from "../EditUserForm";
import "../index.css";
import RequestsList from "../RequestsList";
import RequestShowPage from "../RequestShowPage";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: null,
      addingRequest: false,
      editingUser: false,
      userToEdit: null,
      loggedInUser: this.props.loggedInUser,
      requestToView: null,
    };
  }

  componentDidMount() {
    this.getRequests();
    this.findUserToEdit();
  }

  createRequest = async (requestToAdd) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/request/new/";

      const createdRequestResponse = await fetch(url, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToAdd),
      });

      const createdRequestJson = await createdRequestResponse.json();

      if (createdRequestJson.status === 201) {
        this.setState({
          requests: [...this.state.requests, createdRequestJson.data],
        });

        console.log(this.state.requests);
      }
    } catch (err) {
      console.error(err);
    }
  };

  getRequests = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/request/";

      const requestsResponse = await fetch(url, {
        credentials: "include",
      });

      const requestsResponseJson = await requestsResponse.json();

      this.setState({
        requests: requestsResponseJson.data,
      });

      console.log(requestsResponseJson);
    } catch (err) {
      console.error(err);
    }
  };

  findUserToEdit = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/user/edit/";

      const userResponse = await fetch(url, {
        credentials: "include",
      });

      const userResponseJson = await userResponse.json();

      this.setState({
        userToEdit: userResponseJson.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getRequestToView = async (idOfRequestToView) => {
    try {
      const url =
        process.env.REACT_APP_API_URL + "/request/" + idOfRequestToView;

      const requestResponse = await fetch(url, {
        credentials: "include",
      });

      const requestResponseJson = await requestResponse.json();

      this.setState({
        requestToView: requestResponseJson.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateUser = async (updatedUserInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/user/edit/";

      const updatedUserResponse = await fetch(url, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(updatedUserInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedUserJson = await updatedUserResponse.json();

      console.log(updatedUserJson);

      if (updatedUserJson.status === 200) {
        this.setState({
          loggedInUser: updatedUserJson.data,
          userToEdit: updatedUserJson.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  changeAddingRequest = () => {
    if (this.state.addingRequest === false) {
      this.setState({
        addingRequest: true,
      });
      console.log("clicked");
    } else {
      this.setState({
        addingRequest: false,
      });
    }
  };

  changeEditingUser = () => {
    if (this.state.editingUser === false) {
      this.setState({
        editingUser: true,
      });
    } else {
      this.setState({
        editingUser: false,
        userToEdit: null,
      });
    }
  };

  deleteUser = () => {
    this.props.deleteUser();
  };

  backToDashboard = () => {
    this.setState({
      requestToView: null,
    });
  };

  render() {
    return (
      <div>
        {this.state.addingRequest ? (
          <RequestsDashboard
            changeAddingRequest={this.changeAddingRequest}
            createRequest={this.createRequest}
            loggedInUser={this.state.loggedInUser}
          />
        ) : this.state.editingUser ? (
          <EditUserForm
            userToEdit={this.state.userToEdit}
            updateUser={this.updateUser}
            changeEditingUser={this.changeEditingUser}
            deleteUser={this.deleteUser}
          />
        ) : (
          <React.Fragment>
            <img
              className="Logo"
              src="https://i.imgur.com/kDW7dcm.png"
              alt="logo"
            />{" "}
            <Grid container>
              <Grid.Row>
                <Grid.Column>
                  <Header
                    as="h1"
                    dividing
                    style={{
                      color: "white",
                      fontFamily: "Advent Pro",
                      fontSize: "2.5rem",
                      paddingBottom: ".5rem",
                    }}
                  >
                    Your Dashboard
                  </Header>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircleIcon
                      style={{
                        fontSize: "60",
                        color: "white",
                        zIndex: "10",
                        cursor: "pointer",
                      }}
                      onClick={this.changeEditingUser}
                    />
                    <Button
                      onClick={this.changeAddingRequest}
                      style={{
                        color: "white",
                        backgroundColor: "gold",
                        zIndex: "10",
                        marginLeft: "60px",
                      }}
                    >
                      Create Request{" "}
                    </Button>
                    <Button
                      color="red"
                      style={{ marginLeft: "60px", zIndex: "11" }}
                      onClick={this.props.logout}
                    >
                      Logout
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider
              style={{ width: "59%", marginLeft: "auto", marginRight: "auto" }}
            />
            {this.state.requestToView !== null ? (
              <RequestShowPage
                requestToView={this.state.requestToView}
                backToDashboard={this.backToDashboard}
              />
            ) : this.state.requests ? (
              <div>
                <h1
                  style={{
                    color: "white",
                    fontFamily: "Advent Pro",
                    fontSize: "2.5rem",
                  }}
                >
                  Requests Near You
                </h1>
                <RequestsList
                  requests={this.state.requests}
                  getRequestToView={this.getRequestToView}
                  loggedInUser={this.state.loggedInUser}
                />
              </div>
            ) : (
              <div>
                <h1
                  style={{
                    color: "white",
                    fontFamily: "Advent Pro",
                    fontSize: "2.5rem",
                  }}
                >
                  Requests Near You
                </h1>
                <h2> Nothing here </h2>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Dashboard;

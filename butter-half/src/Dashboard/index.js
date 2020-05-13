import React from "react";
import { Button, Grid, Header, Message } from "semantic-ui-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NewRequestForm from "../NewRequestForm";
import EditUserForm from "../EditUserForm";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      addingRequest: false,
      editingUser: false,
      userToEdit: null,
      loggedInUser: this.props.loggedInUser,
    };
  }

  componentDidMount() {
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
      }
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
        userToEdit: null,
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
      });
    }
  };

  deleteUser = () => {
    this.props.deleteUser();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.addingRequest ? (
          <NewRequestForm
            changeAddingRequest={this.changeAddingRequest}
            createRequest={this.createRequest}
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
            <Grid container style={{ padding: "5em 0em" }}>
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
                      flexDirection: "row-reverse",
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
                        marginRight: "20px",
                      }}
                    >
                      Create Request{" "}
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Message>
                    <Header as="h1">This is where requests will go</Header>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;

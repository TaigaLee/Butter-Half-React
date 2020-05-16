import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import RequestEditModal from "../RequestEditModal";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";

export default class RequestShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: "",
      editingRequest: false,
      requestToView: this.props.requestToView,
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.requestToView !== state.requestToView) {
      return {
        requestToView: props.requestToView,
      };
    }
    return null;
  }

  switchEditingRequest = () => {
    if (this.state.editingRequest === false) {
      this.setState({
        editingRequest: true,
      });
    } else {
      this.setState({
        editingRequest: false,
      });
    }
  };

  getLoggedInUser = () => {
    const loggedInUser = this.props.loggedInUser;

    this.setState({
      loggedInUser: loggedInUser,
    });
  };

  handleDelete = () => {
    this.props.deleteRequest(this.props.requestToView._id);
    this.props.backToDashboard();
  };

  render() {
    return (
      <div className="App">
        <Container
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            width: "50%",
            height: "100%",
          }}
        >
          <Message>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "30px",
                paddingTop: "30px",
              }}
            >
              <Grid
                textAlign="center"
                style={{
                  backgroundColor: "gold",
                  width: "100%",
                  height: "100%",
                  padding: "10px 5px",
                }}
              >
                <div>
                  <Header
                    size="huge"
                    as="h1"
                    style={{ fontFamily: "Advent Pro" }}
                  >
                    Restaurant Information
                  </Header>
                  <div
                    style={{
                      flexDirection: "row",
                      fontFamily: "Righteous",
                      fontSize: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>
                      Name: {this.state.requestToView.restaurantName} Address:
                      {this.state.requestToView.restaurantAddress} (
                      {this.state.requestToView.restaurantCity})
                    </p>
                    <p style={{ fontSize: "15px" }}>
                      {" "}
                      Type of request: {this.state.requestToView.typeOfDate}
                    </p>
                    <p style={{ fontSize: "15px" }}>
                      Extra info: {this.state.requestToView.extraInfo}{" "}
                    </p>
                  </div>
                </div>
              </Grid>
            </div>
          </Message>

          <Divider style={{ marginLeft: "auto", marginRight: "auto" }} />

          <Header
            size="huge"
            as="h1"
            style={{
              fontFamily: "Advent Pro",
              color: "white",
              fontSize: "2rem",
              textDecoration: "underline",
            }}
          >
            {this.props.requestToView.user.name}'s Profile{" "}
          </Header>
          <Grid
            stackable
            padded
            columns="two"
            style={{ fontFamily: "Righteous", color: "white" }}
          >
            <Grid.Column>
              <img
                src={this.props.requestToView.user.profilePicture}
                style={{ height: "160px", borderRadius: "80px" }}
                alt="profile-pic"
              />
              <div style={{ marginTop: "15px" }}>
                <p>Location: {this.props.requestToView.user.location}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Header
                  as="h2"
                  style={{
                    marginTop: "10px",
                    color: "white",
                    fontFamily: "Righteous",
                    fontSize: "1.5rem",
                  }}
                >
                  About
                </Header>
                <p>Age: {this.props.requestToView.user.age}</p>
                <p>{this.props.requestToView.user.bio}</p>
              </div>
              <Button.Group>
                {this.props.requestToView.user.email ===
                this.state.loggedInUser.email ? (
                  <Button.Group>
                    <Button
                      color="green"
                      style={{ marginTop: "50px", marginLeft: "20px" }}
                      onClick={this.switchEditingRequest}
                    >
                      Edit
                    </Button>
                    <Button
                      color="red"
                      onClick={this.handleDelete}
                      style={{ marginTop: "50px", marginLeft: "20px" }}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                  </Button.Group>
                ) : (
                  <Button
                    color="green"
                    disabled
                    style={{ marginTop: "50px", marginLeft: "20px" }}
                  >
                    Chat username: {this.props.requestToView.user.chatUsername}
                  </Button>
                )}
                <Button
                  color="yellow"
                  style={{ marginTop: "50px", marginLeft: "20px" }}
                  onClick={this.props.backToDashboard}
                >
                  Back
                </Button>

                {this.state.editingRequest && (
                  <RequestEditModal
                    requestToEdit={this.state.requestToView}
                    switchEditingRequest={this.switchEditingRequest}
                    updateRequest={this.props.updateRequest}
                    getRequestToView={this.props.getRequestToView}
                  />
                )}
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

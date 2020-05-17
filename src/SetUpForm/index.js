import React from "react";
import { Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../index.css";
import { CometChat } from "@cometchat-pro/chat";

export default class FormExampleFieldControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.loggedInUser.name,
      age: "",
      chatUsername: props.loggedInUser.chatUsername,
      bio: "",
      profilePicture: "",
    };
  }

  componentDidMount() {
    this.createChatUser();
  }

  createChatUser = () => {
    const apiKey = "8f2309ad0942c1bb7c03d2e6005b973031289c85";
    const uid = this.state.chatUsername;
    const name = this.state.chatUsername;

    const user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, apiKey).then(
      (user) => {
        console.log("user created", user);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  uploadImage = async (image) => {
    const files = image.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "taigas");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxag2qkwk/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await response.json();

    this.setState({
      profilePicture: file.secure_url,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateUser(this.state);
    this.props.switchNeedsToBeSetUp();
  };

  render() {
    return (
      <React.Fragment>
        <img
          className="Logo"
          src="https://i.imgur.com/kDW7dcm.png"
          alt="logo"
        />
        <h1
          style={{
            paddingTop: "3rem",
            fontFamily: "Advent Pro",
            fontSize: "4rem",
            marginBottom: "35px",
          }}
        >
          Lets finishing setting up your profile!
        </h1>
        <Form
          style={{ width: "45rem", marginRight: "auto", marginLeft: "auto" }}
        >
          <Form.Group widths="equal">
            <Form.Input
              type="file"
              name="profilePicture"
              label="Profile Picture"
              onChange={this.uploadImage}
            />
            <Form.Input
              fluid
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Age"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="About"
            name="bio"
            placeholder="Tell us more about yourself..."
            style={{ height: "200px" }}
            onChange={this.handleChange}
          />
          <Form.Button
            style={{ marginTop: "20px" }}
            onClick={this.handleSubmit}
          >
            Submit
          </Form.Button>
        </Form>
        <footer>Made with love by Taiga Lee 💕</footer>
      </React.Fragment>
    );
  }
}

import React from "react";
import { Form, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../index.css";

export default class SetUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.userToEdit.location,
      bio: this.props.userToEdit.bio,
      profilePicture: this.props.userToEdit.profilePicture,
    };
  }

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

    console.log(file.secure_url);

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
    this.props.changeEditingUser();
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
          Update your profile!
        </h1>
        <Form
          style={{ width: "60rem", marginRight: "auto", marginLeft: "auto" }}
        >
          <Form.Group widths="equal">
            <img
              src={this.state.profilePicture}
              style={{ height: "180px", borderRadius: "80px" }}
              alt="profile-pic"
            />
            <Form.Field>
              <Label
                color="yellow"
                style={{
                  marginTop: "40px",
                  marginBottom: "10px",
                  color: "white",
                  fontFamily: "Advent Pro",
                  fontSize: "1em",
                }}
              >
                {" "}
                Profile Picture{" "}
              </Label>
              <Form.Input
                type="file"
                name="profilePicture"
                onChange={this.uploadImage}
              />
            </Form.Field>
            <Form.Field>
              <Label
                color="yellow"
                style={{
                  marginTop: "40px",
                  marginBottom: "12px",
                  color: "white",
                  fontFamily: "Advent Pro",
                  fontSize: "1em",
                }}
              >
                {" "}
                Zipcode{" "}
              </Label>
              <Form.Input
                fluid
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <Label
              color="yellow"
              style={{
                marginBottom: "10px",
                fontFamily: "Advent Pro",
                fontSize: "1em",
              }}
            >
              About
            </Label>
            <Form.TextArea
              name="bio"
              value={this.state.bio}
              style={{ height: "150px" }}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Button
            style={{ marginTop: "20px" }}
            onClick={this.handleSubmit}
          >
            Edit
          </Form.Button>
        </Form>
        <footer>Made with love by Taiga Lee 💕</footer>
      </React.Fragment>
    );
  }
}

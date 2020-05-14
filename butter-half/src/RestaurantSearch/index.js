import React from "react";
import RequestsDashboard from "../RequestsDashboard";

import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Header,
} from "semantic-ui-react";

export default class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.restaurantName === "" && (
          <React.Fragment>
            <Header
              style={{
                fontFamily: "Advent Pro",
                fontSize: "3.8em",
                marginTop: "3rem",
                color: "white",
              }}
            >
              First step, find the restaurant!
            </Header>
            <Form>
              <Form.Input
                type="text"
                placeholder="Enter restaurant name"
                name="searchTerm"
                onChange={this.props.handleChange}
                style={{ width: "25%" }}
              />
              <Button onClick={this.props.handleSubmit} type="Submit">
                {" "}
                Search{" "}
              </Button>
            </Form>
          </React.Fragment>
        )}

        {this.props.restaurantName !== "" && (
          <div
            style={{
              width: "30%",
              padding: "30px 30px",
              margin: "3rem auto",
            }}
          >
            <Header
              style={{
                fontFamily: "Advent Pro",
                fontSize: "3em",
                color: "white",
              }}
            >
              {" "}
              Is this the right restaurant?{" "}
            </Header>
            <h1
              style={{
                fontFamily: "Righteous",
                color: "white",
                fontSize: "2rem",
              }}
            >
              Restaurant Name: {this.props.restaurantName}
            </h1>
            <h1
              style={{
                fontFamily: "Righteous",
                color: "white",
                fontSize: "2rem",
              }}
            >
              Restaurant Address: {this.props.restaurantAddress}
            </h1>
            <h2
              style={{
                fontFamily: "Righteous",
                color: "white",
                fontSize: "1.8rem",
              }}
            >
              Restaurant City: {this.props.restaurantCity}
            </h2>

            <Button.Group>
              <Button
                color="yellow"
                onClick={this.props.yes}
                style={{ marginRight: "30px", marginTop: "10px" }}
              >
                {" "}
                Yep!{" "}
              </Button>
              <Button
                color="red"
                onClick={this.props.no}
                style={{ marginLeft: "30px", marginTop: "10px" }}
              >
                {" "}
                Nope!{" "}
              </Button>
            </Button.Group>
            <div style={{ marginTop: "20px" }}>
              <small
                style={{
                  color: "red",
                  fontFamily: "Advent Pro",
                }}
              >
                {" "}
                You'll be able to manually enter info on the next page{" "}
              </small>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

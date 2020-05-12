import React from "react";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <img
          className="Logo"
          src="https://i.imgur.com/kDW7dcm.png"
          alt="logo"
        />
        <Grid container style={{ padding: "5em 0em" }}>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h1"
                dividing
                style={{ color: "white", fontFamily: "Advent Pro" }}
              >
                Your Requests
              </Header>
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
    );
  }
}

export default Dashboard;

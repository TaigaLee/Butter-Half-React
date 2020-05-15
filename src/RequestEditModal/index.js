import React from "react";
import { Form, Button, Label, Modal, Header, Radio } from "semantic-ui-react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class RequestEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: this.props.requestToEdit.restaurantName,
      restaurantAddress: this.props.requestToEdit.restaurantAddress,
      restaurantCity: this.props.requestToEdit.restaurantCity,
      extraInfo: this.props.requestToEdit.extraInfo,
      typeOfDate: this.props.requestToEdit.typeOfDate,
      typeOfFood: this.props.requestToEdit.typeOfFood,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRadioChange = (event) => {
    this.setState({
      typeOfDate: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateRequest(this.state);
  };

  render() {
    return (
      <Modal
        open={true}
        closeIcon={true}
        onClose={this.props.switchEditingRequest}
        style={{ paddingBottom: "20px", paddingTop: "20px" }}
      >
        <Header>Enter new info</Header>
        <Form>
          <Label>Restaurant Name: </Label>
          <Form.Input
            type="text"
            name="restaurantName"
            value={this.state.restaurantName}
            onChange={this.handleChange}
          />

          <Label>Restaurant Address: </Label>
          <Form.Input
            type="text"
            name="restaurantAddress"
            value={this.state.restaurantAddress}
            onChange={this.handleChange}
          />
          <Label>Restaurant City: </Label>
          <Form.Input
            type="text"
            name="restaurantCity"
            value={this.state.restaurantCity}
            onChange={this.handleChange}
          />
          <Label>Type of Food: </Label>
          <Form.Input
            type="text"
            name="typeOfFood"
            value={this.state.typeOfFood}
            onChange={this.handleChange}
          />
          <Label>Extra information to add? </Label>
          <Form.Input
            type="text"
            name="extraInfo"
            value={this.state.extraInfo}
            onChange={this.handleChange}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type of request *</FormLabel>
              <RadioGroup aria-label="type">
                <FormControlLabel
                  value="date"
                  name="typeOfDate"
                  control={<Radio />}
                  label="It's a date!"
                  onChange={this.handleRadioChange}
                />
                <FormControlLabel
                  name="typeOfDate"
                  value="friends"
                  control={<Radio />}
                  label="Just friends!"
                  onChange={this.handleRadioChange}
                />
                <FormControlLabel
                  value="either"
                  name="typeOfDate"
                  control={<Radio />}
                  label="Either or!"
                  onChange={this.handleRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            color="yellow"
            style={{ height: "40px", marginLeft: "50px", marginTop: "20px" }}
            type="Submit"
            onClick={this.handleSubmit}
          >
            {" "}
            Edit{" "}
          </Button>
        </Form>
      </Modal>
    );
  }
}

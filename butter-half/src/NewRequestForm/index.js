import React from "react";

import {
  Form,
  Button,
  Label,
  Modal,
  Header,
  TextArea,
} from "semantic-ui-react";

export default class NewRequestForm extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: "",
      extraInfo: "",
      typeOfDate: "",
      viewed: false,
      accepted: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createRequest({
      restaurant: this.state.restaurant,
      typeOfDate: this.state.typeOfDate,
      extraInfo: this.state.extraInfo,
      viewed: this.state.viewed,
      accepted: this.state.accpeted,
    });

    this.props.changeAddingRequest();
  };

  render() {
    return (
      <div>
        <button onClick={this.props.changeAddingRequest}> Click</button>
        NewRequestForm
      </div>
    );
  }
}

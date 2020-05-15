import React from "react";
import NewRequestForm from "../NewRequestForm";
import RestaurantSearch from "../RestaurantSearch";

export default class RequestsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      restaurantName: "",
      restaurantAddress: "",
      restaurantCity: "",
      extraInfo: "",
      viewed: false,
      accepted: false,
      restaurantSearchComplete: false,
      typeOfDate: "",
    };
  }

  handleNewRequestSubmit = (event) => {
    event.preventDefault();
    this.props.changeAddingRequest();
    this.props.createRequest(this.state);
  };

  findRestaurants = async () => {
    try {
      const response = await fetch(
        `http://opentable.herokuapp.com/api/restaurants?name=` +
          this.state.searchTerm
      );

      const data = await response.json();

      this.setState({
        restaurantName: data.restaurants[0].name,
        restaurantAddress: data.restaurants[0].address,
        restaurantCity: data.restaurants[0].city,
      });
    } catch (err) {
      console.error(err);
    }
  };

  changeAddingRequest = () => {
    this.props.changeAddingRequest();
  };

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
    this.findRestaurants(this.state.searchTerm);
    // this.nextStep();
  };

  no = () => {
    this.setState({
      restaurantName: "",
      restaurantAddress: "",
      restaurantCity: "",
    });

    this.nextStep();
  };

  yes = () => {
    this.nextStep();
  };

  nextStep = () => {
    if (this.state.restaurantSearchComplete === false) {
      this.setState({
        restaurantSearchComplete: true,
      });
    } else {
      this.setState({
        restaurantSearchComplete: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <img
          className="Logo"
          src="https://i.imgur.com/kDW7dcm.png"
          alt="logo"
        />

        {this.state.restaurantSearchComplete ? (
          <NewRequestForm
            restaurantName={this.state.restaurantName}
            restaurantAddress={this.state.restaurantAddress}
            restaurantCity={this.state.restaurantCity}
            changeAddingRequest={this.changeAddingRequest}
            handleNewRequestSubmit={this.handleNewRequestSubmit}
            handleChange={this.handleChange}
            handleRadioChange={this.handleRadioChange}
          />
        ) : (
          <RestaurantSearch
            findRestaurants={this.findRestaurants}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            restaurantName={this.state.restaurantName}
            restaurantAddress={this.state.restaurantAddress}
            restaurantCity={this.state.restaurantCity}
            yes={this.yes}
            no={this.no}
          />
        )}
      </React.Fragment>
    );
  }
}

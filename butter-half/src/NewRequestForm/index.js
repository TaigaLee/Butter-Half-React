import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function NewRequestForm(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <h1 style={{ fontFamily: "Advent Pro", fontSize: "3.8rem" }}>
        Fill out the rest to find the other half to your pear!
      </h1>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <React.Fragment>
              {" "}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Restaurant name"
                    name="restaurantName"
                    value={props.restaurantName}
                    fullWidth
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="resturantAddress"
                    label="Restaurant address"
                    value={props.restaurantAddress}
                    fullWidth
                    onChange={props.handleChange}
                  />
                  <TextField
                    required
                    name="resturantCity"
                    label="Restaurant city"
                    value={props.restaurantCity}
                    fullWidth
                    style={{ marginTop: "20px" }}
                    onChange={props.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} style={{ marginTop: "30px" }}>
                  <TextField
                    required
                    id="type"
                    label="Type of food"
                    name="typeOfFood"
                    onChange={props.handleChange}
                    fullWidth
                  />
                </Grid>
                <FormControl
                  component="fieldset"
                  style={{ marginLeft: "50px", marginTop: "25px" }}
                >
                  <FormLabel component="legend">Type of request *</FormLabel>
                  <RadioGroup aria-label="type" name="typeOfDate">
                    <FormControlLabel
                      value="date"
                      name="date"
                      control={<Radio />}
                      label="It's a date!"
                      onChange={props.handleRadioChange}
                    />
                    <FormControlLabel
                      name="friends"
                      value="friends"
                      control={<Radio />}
                      label="Just friends!"
                      onChange={props.handleRadioChange}
                    />
                    <FormControlLabel
                      value="either"
                      name="either"
                      control={<Radio />}
                      label="Either or!"
                      onChange={props.handleRadioChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Anything else you'd like to add?"
                    name="extraInfo"
                    fullWidth
                    onChange={props.handleChange}
                  />
                </Grid>
                <div
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    size="large"
                    style={{
                      backgroundColor: "gold",
                      color: "white",
                      fontFamily: "Advent Pro",
                      marginRight: "20px",
                    }}
                    type="submit"
                    onClick={props.handleNewRequestSubmit}
                  >
                    Submit
                  </Button>

                  <Button
                    size="large"
                    style={{
                      marginLeft: "20px",
                      backgroundColor: "red",
                      color: "white",
                      fontFamily: "Advent Pro",
                    }}
                    onClick={props.changeAddingRequest}
                  >
                    Exit
                  </Button>
                </div>
              </Grid>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

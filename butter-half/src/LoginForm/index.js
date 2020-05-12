import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../index.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginRegisterForm(props) {
  const classes = useStyles();
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "#ff914d" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h4"
          style={{ fontFamily: "Advent Pro" }}
        >
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={props.email}
                onChange={props.handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={props.password}
                onChange={props.handleChange}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={props.handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            style={{
              fontFamily: "Advent Pro",
              backgroundColor: "gold",
            }}
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <span className="fake-link" onClick={props.switchForm}>
                Need an account? Sign up
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

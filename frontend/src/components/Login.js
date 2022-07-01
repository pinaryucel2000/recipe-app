import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { setLocalStorage } from "../localStorage";
import { DJANGO_SERVER } from "../util";

const useStyles = makeStyles({
  root: {
    margin: "-10px",
    display: "flex",
    backgroundColor: "white",
  },
  container: {
    boxShadow:
      "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    background:
      "linear-gradient(to bottom, #E1E8ED, #E1E8ED 15%, rgb(245, 248, 250) 15%, rgb(245, 248, 250) 90%, #E1E8ED 87%, #E1E8ED 100%)",
    display: "block",
    width: "300px",
    minWidth: "300px",
    minHeight: "200px",
    height: "410px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "100px",
  },

  headerContainer: { display: "flex" },

  header1: {
    marginLeft: "60px",
    marginRight: "10px",
    fontSize: "30px",
    fontWeight: "normal",
    color: "black",
    marginBottom: "40px",
    marginTop: "8px",
  },
  header2: {
    fontSize: "30px",
    color: "#3FC060",
    fontWeight: "bold",
    marginBottom: "40px",
    marginTop: "8px",
  },

  typog: {
    color: "black",
    marginTop: "12%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
  },
  textfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        border: "1.5px solid",
      },
      "&:hover fieldset": {
        borderColor: "black",
        border: "1.5px solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  button: {
    color: "white",
    backgroundColor: "#3FC060",
    "&:hover": {
      backgroundColor: "#3FC060",
      borderColor: "#3FC060",
      boxShadow: "none",
    },
  },
  error: {
    color: "red",
    marginTop: "-5%",
    marginBottom: "5%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("error");

  setLocalStorage("userID", undefined);
  setLocalStorage("username", undefined);

  const linkStyle = {
    textDecoration: "none",
    color: "#3FC060",
  };
  return (
    <Grid className={classes.root}>
      <Grid className={classes.container}>
        <Grid className={classes.headerContainer}>
          <Typography className={classes.header1}>Django </Typography>
          <Typography className={classes.header2}>Food</Typography>
        </Grid>

        <br />
        <Grid>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />

          <TextField
            label="Username"
            value={username}
            className={classes.textfield}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <br />
        <br />
        <Grid>
          <TextField
            label="Password"
            type="password"
            value={password}
            className={classes.textfield}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <br />
        <br />
        <Grid>
          <Typography
            className={classes.error}
            style={error == "error" ? { color: "rgb(245, 248, 250)" } : {}}
          >
            {error}
          </Typography>

          <Button
            className={classes.button}
            variant="contained"
            onClick={() => {
              const credentials = { username: username, password: password };
              fetch(DJANGO_SERVER + "/api/authenticate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
              })
                .then((data) => data.json())
                .then((data) => {
                  if (data.token !== undefined) {
                    setLocalStorage("username", username);
                    setLocalStorage("userID", data.id);
                    window.location.href = "/recipes";
                  } else {
                    setError("Incorrect username or password");
                  }
                })
                .catch((error) => console.error(error));
            }}
          >
            Login
          </Button>

          <Typography className={classes.typog}>
            New here? Click
            <Link href={"/register"} style={linkStyle}>
              {" "}
              here{" "}
            </Link>
            to register.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

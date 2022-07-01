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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DJANGO_SERVER } from "../util";
import { setLocalStorage } from "../localStorage";

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
    width: "350px",
    minWidth: "350px",
    minHeight: "200px",
    height: "500px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "100px",
  },

  headerContainer: { display: "flex" },

  header1: {
    marginLeft: "80px",
    marginRight: "10px",
    fontSize: "30px",
    fontWeight: "normal",
    color: "black",
    marginBottom: "40px",
    marginTop: "15px",
  },
  header2: {
    fontSize: "30px",
    color: "#3FC060",
    fontWeight: "bold",
    marginBottom: "40px",
    marginTop: "15px",
  },

  typog: {
    color: "black",
    marginTop: "3%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
  },
  textfield: {
    width: "90%",
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
  error: {
    color: "red",
    marginTop: "5%",
    marginBottom: "1%",
    width: "90%",
    height: "15%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  errorShorter: {
    color: "red",
    marginTop: "5%",
    marginBottom: "1%",
    width: "90%",
    height: "7%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: "5%",
    color: "white",
    backgroundColor: "#3FC060",
    "&:hover": {
      backgroundColor: "#3FC060",
      borderColor: "#3FC060",
      boxShadow: "none",
    },
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.headerContainer}>
      <Typography className={classes.header1}>Django </Typography>
      <Typography className={classes.header2}>Food</Typography>
    </Grid>
  );
};

export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("error");
  const [passwordError, setPasswordError] = useState("error");
  const [open, setOpen] = useState(false);

  setLocalStorage("userID", undefined);
  setLocalStorage("username", undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#3FC060",
  };
  return (
    <Grid className={classes.root}>
      <Grid className={classes.container}>
        <Header />

        <br />
        <Grid>
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
        <Typography
          className={classes.error}
          style={
            usernameError == "error" ? { color: "rgb(245, 248, 250)" } : {}
          }
        >
          {usernameError}
        </Typography>

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
        <Typography
          className={classes.errorShorter}
          style={
            passwordError == "error" ? { color: "rgb(245, 248, 250)" } : {}
          }
        >
          {passwordError}
        </Typography>

        <Grid>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => {
              const credentials = { username: username, password: password };
              fetch(DJANGO_SERVER + "/api/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
              })
                .then((data) => data.json())
                .then((data) => {
                  console.log(data);
                  if (data.id != undefined) {
                    // account has been successfully created
                    handleClickOpen();
                  } else {
                    if (data.username != undefined) {
                      setUsernameError(data.username[0]);
                    }

                    if (data.password != undefined) {
                      setPasswordError(data.password[0]);
                    }
                  }
                })
                .catch((error) => console.error(error));
            }}
          >
            Register
          </Button>
          <br />
          <br />
          <br />
          <Typography className={classes.typog}>
            Have an account? Click
            <Link href={"/"} style={linkStyle}>
              {" "}
              here{" "}
            </Link>
            to login.
          </Typography>
          <Dialog
            onClose={() => {
              window.location.href = "/";
            }}
            open={open}
          >
            <DialogTitle>
              Your account has been created successfully
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
}

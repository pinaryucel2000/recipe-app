import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import StyledCheckbox from "../StyledCheckbox";
import { getLocalStorage } from "../../localStorage";
import { DJANGO_SERVER } from "../../util";

const useStyles = makeStyles(() => ({
  subscribe: {
    fontWeight: "bold",
    marginLeft: "2.5%",
    textAlign: "left",
    marginTop: "0.7%",
    fontSize: "24px",
  },
  error: { marginTop: "2%", color: "white" },
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
  profileSettings: {
    textTransform: "none",
    color: "#3FC060",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "18px",
    marginTop: "-0.7%",
  },
}));

export default function Subscription({ recipeID }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchSubscription() {
      await fetch(
        "http://127.0.0.1:8000/api/subscriptions/?uid=" +
          getLocalStorage("userID") +
          "&rid=" +
          recipeID,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.length != 0) {
            console.log(data);
            setChecked(true);
          }
        })
        .then(() => {})
        .catch((error) => console.error(error));
    }

    fetchSubscription();
  }, []);

  useEffect(() => {
    async function fetchEmail() {
      await fetch(DJANGO_SERVER + "/api/profile/" + getLocalStorage("userID"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.userID != undefined) {
            emailTmp = data.email;
          }
        })
        .then(() => {
          setEmail(emailTmp);
        })
        .catch((error) => console.error(error));
    }

    let emailTmp = "";
    if (!checked) {
      fetchEmail();
    }
  }, [open]);

  const subscribe = () => {
    const subscription = {
      user: getLocalStorage("userID"),
      recipeID: recipeID,
    };

    fetch(DJANGO_SERVER + "/api/subscriptions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    })
      .then((data) => data.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const unsubscribe = () => {
    async function unsub() {
      await fetch(
        DJANGO_SERVER +
          "/api/subscriptions/?uid=" +
          getLocalStorage("userID") +
          "&rid=" +
          recipeID,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          subscriptionID = data[0].id;
        })
        .catch((error) => console.error(error));

      await fetch(
        DJANGO_SERVER + "/api/subscriptions/" + subscriptionID + "/",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
    let subscriptionID;
    unsub();
  };

  return (
    <Grid>
      <Grid style={{ display: "flex" }}>
        <Typography className={classes.subscribe}>
          Subscribe to reviews of this recipe
        </Typography>

        <StyledCheckbox
          checked={checked}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        {checked ? (
          <div>
            <DialogTitle id="form-dialog-title">Unsubscribe?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will no longer receive emails of the reviews of this recipe.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  unsubscribe();
                }}
                color="default"
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        ) : email == "" ? (
          <div>
            <DialogTitle id="form-dialog-title">Oooops!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We could not find any email associated with your accont. Please
                go to
                <Button
                  className={classes.profileSettings}
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                >
                  profile settings
                </Button>
                to add an email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Ok
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will receive an email when a new review is made for this
                recipe.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  subscribe();
                }}
                color="default"
              >
                Subscribe
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </Grid>
  );
}

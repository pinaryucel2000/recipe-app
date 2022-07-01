import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import { getLocalStorage } from "../../localStorage";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DJANGO_SERVER } from "../../util";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1000px",
    display: "grid",
  },

  button: {
    color: "white",
    width: "5%",
    marginTop: "1%",
    marginLeft: "90%",
    backgroundColor: "#3FC060",
    "&:hover": {
      backgroundColor: "#3FC060",
      borderColor: "#3FC060",
      boxShadow: "none",
    },
  },

  header: {
    fontWeight: "bold",
    marginLeft: "2.5%",
    textAlign: "left",
    fontSize: "30px",
    marginTop: "2.5%",
  },
  rating: { marginLeft: "2.3%", marginTop: "0.7%" },

  error: {
    color: "red",
    textAlign: "left",
    margin: "1.5%",
    marginLeft: "2.7%",
  },
  textfield: {
    marginTop: "1%",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
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
}));

const getTimeStamp = () => {
  const timeStamp = parseInt(new Date().getTime() / 1000);
  return timeStamp;
};

const getDate = () => {
  const today = new Date();

  let day = today.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  let month = today.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  return day + "-" + month + "-" + today.getFullYear();
};

export default function Review({ recipeID }) {
  const classes = useStyles();
  const [value, setValue] = useState(3);
  const [comment, setComment] = useState();
  const [error, setError] = useState("");
  const [reviewExists, setReviewExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchReview() {
      fetch(
        DJANGO_SERVER +
          "/api/reviews/" +
          getLocalStorage("userID") +
          "_" +
          recipeID,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.recipe != undefined) {
            setReviewExists(true);
            setComment(data.comment);
            setValue(data.rating);
          }
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }

    fetchReview();
  }, []);

  const postReview = () => {
    const userID = getLocalStorage("userID");
    const review = {
      userID_recipeID: userID + "_" + recipeID,
      authorUsername: getLocalStorage("username"),
      recipe: recipeID,
      rating: value,
      comment: comment,
      timeStamp: getTimeStamp(),
    };

    fetch(DJANGO_SERVER + "/api/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.recipe != undefined) {
          window.location.reload();
          setError("");
        } else {
          setError(data.comment[0]);
        }
      })
      .catch((error) => console.error(error));
  };

  const patchReview = () => {
    const userID = getLocalStorage("userID");
    const review = {
      authorID: userID,
      authorUsername: getLocalStorage("username"),
      recipe: recipeID,
      rating: value,
      comment: comment,
      timeStamp: getTimeStamp(),
    };

    fetch(
      DJANGO_SERVER +
        "/api/reviews/" +
        getLocalStorage("userID") +
        "_" +
        recipeID +
        "/",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.recipe != undefined) {
          window.location.reload();
          setError("");
        } else {
          setError(data.comment[0]);
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteReview = () => {
    fetch(
      DJANGO_SERVER +
        "/api/reviews/" +
        getLocalStorage("userID") +
        "_" +
        recipeID +
        "/",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Grid className={classes.root}>
      {loading ? (
        <div></div>
      ) : reviewExists ? (
        <Grid className={classes.root}>
          <Grid style={{ display: "flex" }}>
            <Typography className={classes.header}>Your review</Typography>
            <IconButton style={{ marginTop: "2%" }} onClick={handleClickOpen}>
              <DeleteIcon fontSize="large" />
            </IconButton>

            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>
                Are you sure that you want to delete your review?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={deleteReview}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Rating
            className={classes.rating}
            defaultValue={2}
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          {error == "" ? (
            <div />
          ) : (
            <Typography className={classes.error}>{error}</Typography>
          )}
          <TextField
            multiline
            rows={4}
            variant="outlined"
            className={classes.textfield}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button className={classes.button} onClick={patchReview}>
            Save
          </Button>
        </Grid>
      ) : (
        <Grid className={classes.root}>
          <Typography className={classes.header}>Review the recipe</Typography>
          <Rating
            className={classes.rating}
            defaultValue={2}
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          {error == "" ? (
            <div />
          ) : (
            <Typography className={classes.error}>{error}</Typography>
          )}
          <TextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            className={classes.textfield}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button className={classes.button} onClick={postReview}>
            Post
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

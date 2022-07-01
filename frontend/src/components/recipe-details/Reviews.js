import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DJANGO_SERVER } from "../../util";

function Review({ author, rating, comment }) {
  const classes = useStyles();

  return (
    <Grid className={classes.review}>
      <Grid className={classes.flex}>
        <AccountCircleIcon className={classes.icon} />
        <Typography className={classes.username}>{author}</Typography>
      </Grid>
      <Rating className={classes.rating} value={rating} size="large" />
      <TextField className={classes.comment} value={comment} multiline />
    </Grid>
  );
}

export default function Reviews({ recipeID, setRating }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      await fetch(DJANGO_SERVER + "/api/reviews/?rid=" + recipeID, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            sum = sum + data[i].rating;
            reviewsTmp.push({
              author: data[i].authorUsername,
              rating: data[i].rating,
              comment: data[i].comment,
            });
          }

          average = sum / data.length;
        })
        .then(() => {
          let tmp = reviewsTmp;
          setReviews(reviewsTmp);
          setLoading(false);
          setRating(average);
        })
        .catch((error) => console.error(error));
    }

    let average = 0;
    let sum = 0;
    let reviewsTmp = [];
    fetchReviews();
  }, []);

  return (
    <Grid className={classes.root}>
      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid>
          <Typography className={classes.header}>Reviews</Typography>
          {reviews.map((review, index) => (
            <Review
              author={review.author}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1000px",
    display: "grid",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    minHeight: "10vw",
    backgroundColor: "white",
    color: "black",
    position: "relative",
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

  flex: { display: "flex" },

  review: {
    marginTop: "3%",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },

  username: {
    fontSize: "20px",
    marginLeft: "1%",
    marginTop: "0.2%",
  },

  icon: { width: "35px", height: "35px" },
  rating: { marginRight: "90%", marginTop: "1%" },
  comment: {
    textAlign: "left",
    marginTop: "1%",
    fontSize: "18px",
  },

  comment: {
    marginTop: "1%",
    width: "100%",
    marginLeft: "0%",
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

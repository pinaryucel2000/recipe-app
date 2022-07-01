import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FlagIcon from "@material-ui/icons/Flag";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#F5F8FA",
    width: "94%",
    minHeight: "0px",
    margin: "3%",
    textAlign: "left",
    overflow: "auto",
    display: "flex",
  },
  header: {
    color: "#b34341",
    fontSize: "41px",
    fontWeight: "bold",
    marginLeft: "8%",
    marginTop: "6%",
  },
  labelContainer: {
    marginTop: "2%",
    width: "100%",
    minHeight: "100px",
    marginLeft: "6%",
    marginBottom: "5%",
  },
  labelTypeText: {
    marginLeft: "2%",
    fontSize: "23px",
    width: "30%",
    fontWeight: "bold",
  },
  labelText: {
    color: "#b34341",
    marginLeft: "2%",
    fontSize: "23px",
  },
  flex: { display: "flex", marginTop: "2%" },
  left: { width: "70%", minHeight: "300px" },
  right: { width: "30%", minHeight: "300px", display: "grid" },
  rating: {
    marginLeft: "18%",
    marginRight: "auto",
    color: "#162328",
  },
}));

export default function Recipe({ recipeProperties, rating }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const recipeImage = {
    backgroundImage: 'url("' + recipeProperties.image + '")',
    backgroundSize: "cover",
    width: "250px",
    height: "250px",
    marginTop: "20%",
  };

  return (
    <Grid className={classes.container}>
      <Grid className={classes.left}>
        <Labels recipeProperties={recipeProperties} />
      </Grid>
      <Grid className={classes.right}>
        <Grid style={recipeImage}> </Grid>
        <Rating
          readOnly
          className={classes.rating}
          value={value}
          precision={0.01}
          size="large"
        />
      </Grid>
    </Grid>
  );
}

function Labels({ recipeProperties }) {
  const classes = useStyles();

  return (
    <Grid>
      <Typography className={classes.header}>
        {recipeProperties.label}
      </Typography>

      <Grid className={classes.labelContainer}>
        <Grid className={classes.flex}>
          <LocalOfferIcon />
          <Typography className={classes.labelTypeText}>Course</Typography>
          <Typography className={classes.labelText}>
            {recipeProperties.course}
          </Typography>
        </Grid>

        <Grid className={classes.flex}>
          <FlagIcon />
          <Typography className={classes.labelTypeText}>Cuisine</Typography>
          <Typography className={classes.labelText}>
            {recipeProperties.cuisine}
          </Typography>
        </Grid>

        <Grid className={classes.flex}>
          <WatchLaterIcon />
          <Typography className={classes.labelTypeText}>Total Time</Typography>
          <Typography className={classes.labelText}>
            {parseInt(parseInt(recipeProperties.totalTime) / 60) === 0 ? (
              <div> {recipeProperties.totalTime} mins</div>
            ) : (
              <div>
                {parseInt(parseInt(recipeProperties.totalTime) / 60)} hr
                {recipeProperties.totalTime % 60 === 0 ? (
                  <div></div>
                ) : (
                  <label> and {recipeProperties.totalTime % 60} mins</label>
                )}
              </div>
            )}
          </Typography>
        </Grid>

        <Grid className={classes.flex}>
          <RestaurantIcon />
          <Typography className={classes.labelTypeText}>Servings</Typography>
          <Typography className={classes.labelText}>
            {recipeProperties.servings}
          </Typography>
        </Grid>

        <Grid className={classes.flex}>
          <WhatshotIcon />
          <Typography className={classes.labelTypeText}>Calories</Typography>
          <Typography className={classes.labelText}>
            {recipeProperties.calories} kcal
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

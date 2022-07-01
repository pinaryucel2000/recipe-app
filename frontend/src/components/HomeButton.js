import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  headerContainer: { display: "flex", marginBottom: "auto", marginTop: "auto" },

  header1: {
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    marginRight: "5%",
    fontSize: "35px",
    fontWeight: "normal",
    color: "white",
  },
  header2: {
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "35px",
    color: "#3FC060",
    fontWeight: "bold",
  },

  homeButton: { textTransform: "none", marginLeft: "2%" },
}));

export default function HomeButton() {
  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.homeButton}
        onClick={() => {
          window.location.href = "/recipes";
        }}
      >
        <Grid className={classes.headerContainer}>
          <Typography className={classes.header1}>Django </Typography>
          <Typography className={classes.header2}>Recipes</Typography>
        </Grid>
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import PlainTopMenu from "../PlainTopMenu";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import SideMenu from "./SideMenu";
import { makeStyles } from "@material-ui/core/styles";
import ProfileSettings from "./ProfileSettings";
import MyRecipes from "./MyRecipes";
import { createBrowserHistory } from "history";
import { getLocalStorage } from "../../localStorage";

const useStyles = makeStyles(() => ({
  root: { minWidth: "1250px" },
  profile: {
    backgroundColor: "#162328",
    minWidth: "1250px",
    minHeight: "1150px",
    marginLeft: "-1%",
    marginRight: "-1%",
    overflow: "hidden",
    display: "flex",
  },

  container: {
    display: "block",
    width: "1150px",
    minWidth: "1150px",
    minHeight: "800px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  paper: {
    position: "relative",
    width: "1150px",
    minWidth: "1150px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px",
    display: "flex",
    justifyContent: "flex-start",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [page, setPage] = useState("Profile");

  const isSignedIn = getLocalStorage("userID") != undefined;
  const history = createBrowserHistory();

  if (!isSignedIn) {
    history.replace("/");
    window.location.href = "/";
  }

  return (
    <Grid className={classes.root}>
      <PlainTopMenu />
      <Grid className={classes.profile}>
        <Grid className={classes.container}>
          <Paper className={classes.paper}>
            <SideMenu setPage={setPage}></SideMenu>
            {page == "Profile" ? <ProfileSettings /> : <MyRecipes />}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeButton from "./HomeButton";
import { Typography } from "@material-ui/core";
import { getLocalStorage } from "../localStorage";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  typ: { fontSize: "18px" },

  appbar: {
    backgroundColor: "#162328",
    marginTop: "-1%",
    width: "102%",
    marginLeft: "-1%",
    boxShadow: "none",
  },

  button: {
    marginLeft: "auto",
    width: "11%",
    textTransform: "none",
  },
  icon: { width: "40px", height: "40px", marginRight: "3%" },

  toolbar: { marginTop: "10px" },
}));

export default function PlainTopMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <HomeButton />

          <Button
            color="inherit"
            className={classes.button}
            onClick={handleClick}
          >
            <AccountCircleIcon className={classes.icon} />{" "}
            <Typography className={classes.typ}>
              {getLocalStorage("username")}{" "}
            </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

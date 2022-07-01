import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeButton from "../HomeButton";
import { Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getLocalStorage, setLocalStorage } from "../../localStorage";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import { Grid } from "@material-ui/core";
import useStyles from "../../style/home/TopMenu";

export default function TopMenu({ setKeyWord_ }) {
  const classes = useStyles();
  const [keyword, setKeyWord] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <HomeButton />

          <Paper component="form" className={classes.searchbar}>
            <IconButton
              className={classes.searchIcon}
              onClick={() => {
                setKeyWord_(keyword);
              }}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="What are you craving?"
              value={keyword}
              onChange={(event) => {
                setKeyWord(event.target.value);
              }}
            />
          </Paper>

          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              window.location.href = "/news";
            }}
          >
            <EmojiFoodBeverageIcon className={classes.icon} />
            <Typography className={classes.typ}> News </Typography>
          </Button>

          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              window.location.href = "/add-recipe";
            }}
          >
            <AddCircleIcon className={classes.icon} />
            <Typography className={classes.typ}> Add Recipe </Typography>
          </Button>

          <Button
            color="inherit"
            className={classes.button}
            onClick={handleClick}
          >
            <AccountCircleIcon className={classes.icon} />{" "}
            <Typography className={classes.typ}>
              {" "}
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
                setLocalStorage("userID", undefined);
                setLocalStorage("username", undefined);
                window.location.href = "/";
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

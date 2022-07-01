import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getLocalStorage } from "../../localStorage";
import Menu from "@material-ui/core/Menu";
import { Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "../../style/news/NewsTopMenu";
import { Typography } from "@material-ui/core";

export default function NewsTopMenu() {
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
          <Grid className={classes.buttonContainer}>
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
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React, { useState } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ReceiptIcon from "@material-ui/icons/Receipt";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
    width: "270px",
    minHeight: "700px",
    backgroundColor: "#f8f4fc",
  },
  typography: {
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    margin: "-15px",
    fontSize: "20px",
  },
  menuItem: { padding: "20px" },
  typographyNested: {
    fontSize: "16px",
    marginLeft: "5px",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
  },
}));

export default function SideMenu({ setPage }) {
  const [selection, setSelection] = useState("");
  const classes = useStyles();
  function handleChange(name) {
    setSelection(name);
    setPage(name);
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem
            name="Profile"
            className={classes.menuItem}
            selected={selection === "Profile"}
            onClick={() => handleChange("Profile")}
          >
            <ListItemIcon>
              <PersonIcon fontSize="large" />
            </ListItemIcon>
            <Typography className={classes.typography} variant="inherit">
              Profile
            </Typography>
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            selected={selection === "My Recipes"}
            onClick={() => handleChange("My Recipes")}
          >
            <ListItemIcon>
              <ReceiptIcon fontSize="large" />
            </ListItemIcon>
            <Typography className={classes.typography} variant="inherit">
              My Recipes
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}

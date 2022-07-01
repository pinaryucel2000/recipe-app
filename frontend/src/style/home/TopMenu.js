import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  appbar: {
    backgroundColor: "#162328",
    marginTop: "-1%",
    width: "103%",
    marginLeft: "-0.8%",
    boxShadow: "none",
  },

  button: {
    marginLeft: "1%",
    marginRight: "1px",
    width: "11%",
    textTransform: "none",
  },
  icon: { width: "40px", height: "40px", marginRight: "5%" },

  searchIcon: { color: "black" },

  typ: { fontSize: "18px" },

  searchbar: {
    marginLeft: "3%",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "53%",
    borderRadius: "0px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  toolbar: { marginTop: "10px" },
}));

export default useStyles;

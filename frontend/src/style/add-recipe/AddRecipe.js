import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: { minWidth: "1200px" },
  root: {
    flexGrow: 1,
    width: "1000px",
    border: "5px solid #162328",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    marginBottom: "5%",
  },
  button: {
    marginBottom: "3.5%",
    color: "white",
    backgroundColor: "#3FC060",
    "&:hover": {
      backgroundColor: "#3FC060",
      borderColor: "#3FC060",
      boxShadow: "none",
    },
  },
}));

export default useStyles;

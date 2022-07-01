import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  typ: { fontSize: "20px" },

  appbar: {
    backgroundColor: "#c23b22",
    marginTop: "-1%",
    width: "102%",
    marginLeft: "-1%",
    boxShadow: "none",
  },
  buttonContainer: {
    display: "flex",
    display: "inlineBlock",
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: "0.3%",
    marginRight: "16.5%",
    position: "relative",
    float: "right",
    textTransform: "none",
  },
  icon: { width: "40px", height: "40px", marginRight: "3%" },

  toolbar: { marginTop: "10px" },
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
    color: "white",
    fontWeight: "bold",
  },

  homeButton: { textTransform: "none", marginLeft: "15.5%", float: "left" },
}));

export default useStyles;

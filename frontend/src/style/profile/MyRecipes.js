import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "73.5%",
  },
  header1: {
    marginTop: "5%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "30px",
    color: "#666666",
    marginRight: "2%",
    marginLeft: "40%",
  },
  pagination: {
    maxWidth: "fit-content",
    marginTop: "-3%",
    marginBottom: "1%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header2: {
    marginTop: "5%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "30px",
    color: "#3FC060",
    fontWeight: "bold",
  },
  headerContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  dividerHeader: {
    background:
      "linear-gradient(to right, #F9F6F2  5%, #5ca8c6 10%, #3d7070  15%, #004949    25%,#0a1b40   80%, #0a1b40  90%,#5ca8c6 95%, #F9F6F2 );",
    marginTop: "15px",
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  recipeContainer: {
    marginTop: "5%",
    width: "100%",
    height: "70%",
  },
  recipeLabel: {
    width: "100%",
    textAlign: "left",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "22px",
  },
  recipe: {
    borderBottom: "1px solid #d4d0db",
    height: "10%",
    marginBottom: "3%",
    display: "flex",
  },
  recipeInfo: {
    width: "100%",
    display: "flex",
  },
  button: { textTransform: "none", marginRight: "1%", width: "20%" },
  labelContainer: {
    width: "100%",
  },
}));

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    marginLeft: "2%",
    marginRight: "1%",
    width: "100%",
    minHeight: "0px",
    display: "block",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    minHeight: "800px",
    backgroundColor: "white",
    color: "black",
    position: "relative",
  },
  header: {
    fontSize: "55px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
    fontWeight: "bold",
    marginBottom: "1%",
  },

  subheader: {
    fontSize: "20px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
    marginBottom: "1%",
  },

  recipesContainer: {
    width: "100%",
    minHeight: "0px",
    display: "grid",
  },
  recipeContainer: {
    display: "grid",
    marginBottom: "1%",
    borderBottom: "1px solid rgb(212, 212, 212)",
  },
  recipeLabel: {
    textTransform: "none",
    fontSize: "30px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
  },
  recipeInfo: { display: "grid" },

  rating: { marginLeft: "1.5%" },
  icon: { marginTop: "1%", marginRight: "3%" },
  label: { marginTop: "1%" },
  flex: { display: "flex" },
  labelContainer: {
    marginRight: "",
    display: "flex",
    paddingRight: "1%",
    paddingTop: "1%",
    paddingBottom: "1%",
    minWidth: "25%",
  },
  noResultsFound: { display: "grid", textAlign: "center" },
  sadFace: {
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "10vw",
    minWidth: "10vw",
    marginTop: "5%",
  },
}));

export default useStyles;

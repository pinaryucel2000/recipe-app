import { makeStyles } from "@material-ui/core/styles";
import News from "../../components/news/News";

const useStyles = makeStyles((theme) => ({
  root: { minWidth: "1000px" },
  articleContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "67%",
  },
  pagination: {
    marginLeft: "29%",
    marginTop: "5%",
    marginBottom: "3%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    minHeight: "600px",
    backgroundColor: "white",
    color: "black",
    position: "relative",
  },
  header: {
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "50px",
    margin: "1%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
  },
}));

export default useStyles;

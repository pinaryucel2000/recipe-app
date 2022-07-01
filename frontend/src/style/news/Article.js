import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  articleContainer: {
    display: "grid",
    marginBottom: "1%",
    borderBottom: "1px solid rgb(212, 212, 212)",
  },
  flex: { display: "flex" },
  articleInfo: { display: "grid" },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "none",
    fontSize: "25px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
  },
  author: {
    textAlign: "left",
    textTransform: "none",
    fontSize: "24px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
  },
  description: {
    textAlign: "left",
    textTransform: "none",
    fontSize: "22px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
  },
  button: { display: "grid" },
});

export default useStyles;

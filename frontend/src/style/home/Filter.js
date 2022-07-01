import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    marginLeft: "2%",
    top: "2%",
    width: "400px",
    height: "100%",
    position: "sticky",
    display: "fixed",
    textAlign: "left",
  },
  header: {
    fontSize: "40px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
    fontWeight: "bold",
  },
  subheader: {
    fontSize: "30px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
  },
  toggleButton: {
    margin: "2%",
    fontSize: "15px",
    color: "black",
    backgroundColor: "#E1E8ED",
    borderRadius: "10000px",
    "&.Mui-selected": {
      backgroundColor: "black",
      color: "white",
    },
  },
  toggleButtonContainer: {
    marginLeft: "-2.5%",
    width: "100%",
  },
});

export default useStyles;

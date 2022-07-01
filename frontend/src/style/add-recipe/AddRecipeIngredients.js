import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { textAlign: "left", marginBottom: "5%" },
  header: {
    color: "#b34341",
    fontSize: "30px",
    fontWeight: "bold",
    marginLeft: "6%",
    marginTop: "3%",
    marginBottom: "2%",
  },
  ingredientContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    width: "90%",
    marginBottom: "1.5%",
  },
  ingredientContainerText: {
    fontSize: "20px",
    display: "flex",
    width: "720px",
  },
  deleteIcon: { marginRight: "-100px" },
  ingredientContainerWeightText: {
    fontSize: "20px",
    marginLeft: "25%",
    color: "#AAB8C2",
    width: "100px",
    marginRight: "30px",
  },
  button: {
    marginLeft: "-0.4%",
    marginTop: "1%",
    width: "300px",
    textTransform: "none",
    fontSize: "22px",
  },
  icon: { width: "40px", height: "40px", marginRight: "3%" },

  textfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        border: "1.5px solid",
      },
      "&:hover fieldset": {
        borderColor: "black",
        border: "15px solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
}));

export default useStyles;

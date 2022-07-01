import { makeStyles } from "@material-ui/core/styles";

const AddRecipeTopPartStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: "#F5F8FA",
    width: "94%",
    minHeight: "0px",
    margin: "3%",
    textAlign: "left",
    overflow: "auto",
    display: "flex",
  },

  labelContainer: {
    marginTop: "5%",
    width: "100%",
    minHeight: "100px",
    marginLeft: "6%",
    marginBottom: "5%",
  },
  labelTypeText: {
    marginLeft: "2%",
    fontSize: "25px",
    width: "30%",
    fontWeight: "bold",
  },
  labelText: {
    color: "#b34341",
    marginLeft: "2%",
    fontSize: "25px",
  },
  flex: { display: "flex", marginTop: "9%" },
  left: { width: "700px", minHeight: "0vw" },
  right: { width: "300px", minHeight: "0vw", display: "grid" },

  textfield: {
    width: "43%",
    marginLeft: "7%",
    marginTop: "-2%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
        border: "5px  solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },

  textfieldHeader: {
    width: "85%",
    marginLeft: "7%",
    marginTop: "6%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
        border: "5px  solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },

  autocomplete: {
    marginLeft: "7%",
    marginTop: "-5%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      width: "80%",
      "& fieldset": {
        borderColor: "black",
        border: "1px solid",
      },
      "&:hover fieldset": {
        borderColor: "black",
        border: "2px  solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
}));

export default AddRecipeTopPartStyle;

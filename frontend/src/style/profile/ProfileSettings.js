import { makeStyles } from "@material-ui/core/styles";

const ProfileSettingsStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    height: "670px",
    width: "850px",
    backgroundColor: "transparent",
    color: "black",
    position: "relative",
  },
  profile: {
    marginTop: "9%",
    backgroundColor: "white",
    display: "block",
    width: "800px",
    minWidth: "800px",
    minHeight: "50px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  headerContainer: { display: "flex", marginLeft: "32%", marginTop: "5%" },
  dividerHeader: {
    background:
      "linear-gradient(to right, #F9F6F2  5%, #5ca8c6 10%, #3d7070  15%, #004949    25%,#0a1b40   80%, #0a1b40  90%,#5ca8c6 95%, #F9F6F2 );",
    marginLeft: "200px",
    marginTop: "15px",
    width: "400px",
  },

  header1: {
    marginTop: "5%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "30px",
    color: "#666666",
    marginRight: "2%",
  },
  header2: {
    marginTop: "5%",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "30px",
    color: "#3FC060",
    fontWeight: "bold",
  },
  subheader: {
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#666666",
    marginTop: "5%",
    marginBottom: "5%",
    textAlign: "left",
    marginLeft: "3%",
  },

  textfield: {
    width: "93%",
    marginTop: "-4%",
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
        border: "1.5px solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  noEmailText: {
    textAlign: "left",
    marginTop: "3%",
    marginLeft: "3.2%",
    color: "#666666",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "20px",
  },
  textfieldInput: {
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "22px",
  },
  saveButton: {
    marginTop: "3%",
    fontSize: "18px",
    marginLeft: "85%",
  },
  dialogButton: {
    fontSize: "20px",
    color: "black",
    marginLeft: "85%",
  },
  error: {
    marginTop: "0.3%",
    color: "red",
    textAlign: "left",
    marginLeft: "3.3%",
    fontSize: "22px",
  },
  container: {
    width: "100%",
    marginBottom: "5%",
    display: "inline-block",
  },
  clickHereButon: {
    textTransform: "none",
    color: "#3FC060",
    fontFamily:
      "CircularXXWeb,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif",
    fontSize: "18px",
    marginTop: "-0.7%",
  },
  flex: {
    display: "flex",
  },
}));

export default ProfileSettingsStyle;

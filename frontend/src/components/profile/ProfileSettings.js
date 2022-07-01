import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { getLocalStorage } from "../../localStorage";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileSettingsStyle from "../../style/profile/ProfileSettings";
import { DJANGO_SERVER } from "../../util";

export default function ProfileSettings() {
  const classes = ProfileSettingsStyle();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailExists, setEmailExists] = useState();
  const [clickHereButonClicked, setClickHereButtonClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  function validateEmail() {
    if (email == undefined) {
      setValidEmail(false);
      return false;
    }
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      setValidEmail(true);
      return true;
    } else {
      setValidEmail(false);
      return false;
    }
  }

  useEffect(() => {
    async function fetchEmail() {
      await fetch(DJANGO_SERVER + "/api/profile/" + getLocalStorage("userID"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.detail != undefined) {
            setEmailExists(false);
          } else {
            setEmailExists(true);
            emailTmp = data.email;
          }
        })
        .then(() => {
          setEmail(emailTmp);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }

    let emailTmp = "";
    fetchEmail();
  }, []);

  return (
    <Grid>
      <Grid>
        {loading ? (
          <div>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress
                color="inherit"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </Backdrop>
          </div>
        ) : (
          <div>
            <Grid className={classes.profile}>
              <Header />
              <Username email={email} />
              {emailExists ? (
                // Edit existing email
                <EditEmail
                  email={email}
                  setEmail={setEmail}
                  validEmail={validEmail}
                  validateEmail={validateEmail}
                />
              ) : clickHereButonClicked ? (
                // Add new email
                <AddEmail
                  email={email}
                  setEmail={setEmail}
                  validEmail={validEmail}
                  validateEmail={validateEmail}
                />
              ) : (
                <NoEmail
                  setClickHereButtonClicked={setClickHereButtonClicked}
                />
              )}
            </Grid>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

const NoEmail = ({ setClickHereButtonClicked }) => {
  const classes = ProfileSettingsStyle();

  return (
    <Grid className={classes.container}>
      <Typography className={classes.noEmailText}>
        You currently do not have an email associated with your account. Click
        <Button
          className={classes.clickHereButon}
          onClick={() => {
            setClickHereButtonClicked(true);
          }}
        >
          here
        </Button>
        to add an email.
      </Typography>
    </Grid>
  );
};

const AddEmail = ({ email, setEmail, validEmail, validateEmail }) => {
  const classes = ProfileSettingsStyle();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addEmail = () => {
    const profile = { userID: getLocalStorage("userID"), email: email };

    fetch(DJANGO_SERVER + "/api/profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((data) => data.json())
      .then((data) => {
        handleClickOpen();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Grid className={classes.container}>
      <Typography className={classes.subheader}>Email:</Typography>
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={classes.textfield}
        InputProps={{
          value: email,
          classes: {
            input: classes.textfieldInput,
          },
        }}
      />

      {validEmail ? (
        <div></div>
      ) : (
        <Typography className={classes.error}>
          Please enter a valid email.
        </Typography>
      )}

      <Button
        className={classes.saveButton}
        onClick={() => {
          if (validateEmail()) {
            addEmail();
          }
        }}
      >
        Add
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Email has been successfully added."}</DialogTitle>

        <DialogActions>
          <Button
            className={classes.dialogButton}
            onClick={() => {
              window.location.reload();
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const Header = () => {
  const classes = ProfileSettingsStyle();

  return (
    <div>
      <Grid className={classes.headerContainer}>
        <Typography className={classes.header1}>Update Your </Typography>
        <Typography className={classes.header2}>Profile</Typography>
      </Grid>
      <Divider className={classes.dividerHeader} />
    </div>
  );
};

const Username = () => {
  const classes = ProfileSettingsStyle();

  return (
    <div>
      <Typography className={classes.subheader}>Username:</Typography>
      <TextField
        disabled
        value={getLocalStorage("username")}
        className={classes.textfield}
        InputProps={{
          classes: {
            input: classes.textfieldInput,
          },
        }}
      />
    </div>
  );
};

const EditEmail = ({ email, setEmail, validEmail, validateEmail }) => {
  const classes = ProfileSettingsStyle();

  const [open, setOpen] = useState(false);
  const [open_, setOpen_] = useState(false);

  const deleteEmail = () => {
    async function deleteEmail_() {
      const profile = { userID: getLocalStorage("userID"), email: email };
      await fetch(
        DJANGO_SERVER + "/api/profile/" + getLocalStorage("userID") + "/",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      )
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }

    deleteEmail_();
  };

  const saveEmail = () => {
    const profile = { userID: getLocalStorage("userID"), email: email };

    fetch(DJANGO_SERVER + "/api/profile/" + getLocalStorage("userID") + "/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.userID != undefined) {
          handleClickOpen_();
        }
      })

      .catch((error) => console.error(error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen_ = () => {
    setOpen_(true);
  };

  const handleClose_ = () => {
    setOpen_(false);
  };

  return (
    <Grid className={classes.container}>
      <Typography className={classes.subheader}>Email:</Typography>
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={classes.textfield}
        InputProps={{
          value: email,
          classes: {
            input: classes.textfieldInput,
          },
          endAdornment: (
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon style={{ color: "#cc0000" }} />
            </IconButton>
          ),
        }}
      />
      {validEmail ? (
        <div></div>
      ) : (
        <Typography className={classes.error}>
          Please enter a valid email.
        </Typography>
      )}

      <Button
        className={classes.saveButton}
        onClick={() => {
          if (validateEmail()) {
            saveEmail();
          }
        }}
      >
        Save
      </Button>

      <Dialog open={open_} onClose={handleClose_}>
        <DialogTitle>{"Email has been successfully saved."}</DialogTitle>

        <DialogActions>
          <Button
            className={classes.dialogButton}
            onClick={handleClose_}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {"Are you sure that you want to delete the associated email?"}
        </DialogTitle>

        <DialogActions>
          <Button
            className={classes.dialogButton}
            onClick={handleClose}
            color="primary"
          >
            No
          </Button>
          <Button
            className={classes.dialogButton}
            onClick={() => {
              deleteEmail();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

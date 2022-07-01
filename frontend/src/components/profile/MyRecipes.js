import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { getLocalStorage } from "../../localStorage";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { DJANGO_SERVER } from "../../util";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "../../style/profile/MyRecipes";

const RECIPES_PER_PAGE = 6;

export default function MyRecipes() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(1);

  useEffect(() => {
    async function fetchRecipes() {
      await fetch(
        DJANGO_SERVER + "/api/recipes?author=" + getLocalStorage("userID"),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          maxPageTmp =
            data.length % RECIPES_PER_PAGE == 0
              ? data.length / RECIPES_PER_PAGE
              : parseInt(data.length / RECIPES_PER_PAGE) + 1;
        })
        .then(() => {
          setMaxPage(maxPageTmp);
        })
        .catch((error) => console.error(error));
    }

    let maxPageTmp;
    fetchRecipes();
  }, [deleted]);

  useEffect(() => {
    async function fetchRecipes() {
      await fetch(
        DJANGO_SERVER +
          "/api/recipes?author=" +
          getLocalStorage("userID") +
          "&page=" +
          page +
          "&pageSize=" +
          RECIPES_PER_PAGE,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            recipesTmp.push({ label: data[i].label, id: data[i].id });
          }

          while (recipesTmp.length % RECIPES_PER_PAGE != 0) {
            recipesTmp.push({});
          }
        })
        .then(() => {
          setRecipes(recipesTmp);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
    setLoading(true);
    let recipesTmp = [];
    fetchRecipes();
  }, [page, deleted]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid className={classes.root}>
      <Header />
      <Grid className={classes.recipeContainer}>
        {recipes.map((recipe, index) => (
          <Recipe
            id={recipe.id}
            label={recipe.label}
            deleted={deleted}
            setDeleted={setDeleted}
          />
        ))}
      </Grid>

      <Grid className={classes.pagination}>
        <Pagination
          count={maxPage}
          page={page}
          onChange={handleChange}
          size="large"
          defaultPage={1}
          boundaryCount={2}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}

const Recipe = ({ id, label, deleted, setDeleted }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecipe = (recipeID) => {
    setOpen(false);
    fetch(DJANGO_SERVER + "/api/recipes/" + recipeID, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        setDeleted(deleted + 1);
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Grid className={classes.recipe}>
      {label == undefined ? (
        <div></div>
      ) : (
        <Grid className={classes.recipeInfo}>
          <Grid className={classes.labelContainer}>
            <Typography className={classes.recipeLabel}>
              {label.substring(0, 49) +
                (label.substring(0, 50).length == 50 ? "..." : "")}
            </Typography>
          </Grid>

          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              window.location.href = "/recipes/" + id;
            }}
          >
            <VisibilityIcon className={classes.icon} />
            <Typography className={classes.typ}> View </Typography>
          </Button>

          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className={classes.icon} style={{ color: "red" }} />
            <Typography className={classes.typ}> Delete </Typography>
          </Button>

          <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Delete Recipe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                "{label}" will no longer exist. This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteRecipe(id);
                }}
                color="default"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </Grid>
  );
};

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.headerContainer}>
        <Typography className={classes.header1}>My </Typography>
        <Typography className={classes.header2}>Recipes</Typography>
      </Grid>
      <Divider className={classes.dividerHeader} />
    </div>
  );
};

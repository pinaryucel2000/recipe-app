import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlainTopMenu from "../PlainTopMenu";
import { getRecipeIDURL, recipesURL, recipeURL } from "../../util";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import RecipeTopPart from "./RecipeTopPart";
import RecipeIngredients from "./RecipeIngredients";
import Review from "./Review";
import Reviews from "./Reviews";
import Subscription from "./Subscription";
import { DJANGO_SERVER } from "../../util";
import { createBrowserHistory } from "history";
import { getLocalStorage } from "../../localStorage";

const useStyles = makeStyles((theme) => ({
  main: { minWidth: "1200px" },
  root: {
    flexGrow: 1,
    width: "1000px",
    border: "5px solid #162328",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    marginBottom: "3%",
  },

  commentSection: {
    width: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5%",
  },

  noResultsFound: { display: "grid", textAlign: "center" },
  sadFace: {
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "150px",
    minWidth: "150px",
    marginTop: "15%",
  },
  noResultsFoundText: {
    fontSize: "25px",
    fontFamily: ["Nunito", "Roboto", "Arial", "sans-serif"].join(","),
    marginBottom: "1%",
  },
}));

const URLToLabel = () => {
  const URL = window.location.href.slice(
    window.location.href.indexOf("recipes/") + 8
  );
  let label = "";

  for (let i = 0; i < URL.length; i++) {
    if (URL[i] == "_") {
      label = label + "%20";
    } else {
      label = label + URL[i];
    }
  }

  return label;
};

const URLToRecipeID = () => {
  return window.location.href.substr(
    window.location.href.indexOf("recipes/") + 8
  );
};

function capitalizeFirstLetter(string, type) {
  if (type == "cuisine" && string.indexOf(" ") != -1) {
    return (
      String(string).charAt(0).toUpperCase() +
      String(string).slice(1, string.indexOf(" ")) +
      " " +
      String(string)
        .charAt(string.indexOf(" ") + 1)
        .toUpperCase() +
      String(string).slice(string.indexOf(" ") + 2)
    );
  }
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export default function Recipe() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [recipeProperties, setRecipeProperties] = useState({});
  const [resultsFound, setResultsFound] = useState(true);
  const [recipeID, setRecipeID] = useState();
  const [rating, setRating] = useState();

  const isSignedIn = getLocalStorage("userID") != undefined;
  const history = createBrowserHistory();

  if (!isSignedIn) {
    history.replace("/");
    window.location.href = "/";
  }

  useEffect(() => {
    // For fetching Edamam API recipes
    async function fetchRecipeEdamam() {
      await fetch(recipeURL(recipeID), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.recipe === undefined) {
            setResultsFound(false);
          } else {
            let recipe = data.recipe;

            recipePropertiesTmp.label = recipe.label;

            if (recipe.dishType) {
              recipePropertiesTmp.course = capitalizeFirstLetter(
                recipe.dishType[0]
              );
            }

            if (recipe.cuisineType) {
              recipePropertiesTmp.cuisine = capitalizeFirstLetter(
                recipe.cuisineType[0],
                "cuisine"
              );
            }

            recipePropertiesTmp.totalTime = recipe.totalTime;
            recipePropertiesTmp.servings = recipe.yield;
            recipePropertiesTmp.calories = parseInt(recipe.calories);
            recipePropertiesTmp.image = recipe.image;

            let ingredients = [];
            let i = 0;
            while (recipe.ingredients[i] != undefined) {
              ingredients.push({
                ingredient: recipe.ingredients[i].text,
                weight: recipe.ingredients[i].weight,
              });
              i++;
            }

            recipePropertiesTmp.ingredients = ingredients;
          }
        })
        .then(() => {
          setRecipeProperties(recipePropertiesTmp);
        })
        .catch((error) => console.error(error));

      setLoading(false);
    }

    async function fetchRecipeNotEdamam() {
      await fetch(DJANGO_SERVER + "/api/recipes/" + URLToRecipeID(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id == undefined) {
            setResultsFound(false);
          } else {
            console.log(data);
            setResultsFound(true);
          }

          recipePropertiesTmp.id = data.id;
          setRecipeID(recipePropertiesTmp.id);
          recipePropertiesTmp.label = data.label;

          recipePropertiesTmp.course = capitalizeFirstLetter(data.course);

          recipePropertiesTmp.cuisine = capitalizeFirstLetter(
            data.cuisine,
            "cuisine"
          );

          recipePropertiesTmp.totalTime = data.totalTime;
          recipePropertiesTmp.servings = data.servings;
          recipePropertiesTmp.calories = parseInt(data.calories);
          recipePropertiesTmp.image = data.imageURL;
        })
        .then(() => {
          setRecipeProperties(recipePropertiesTmp);
        })
        .catch((error) => console.error(error));

      recipePropertiesTmp.ingredients = [];

      await fetch(
        DJANGO_SERVER +
          "/api/ingredients?rid=" +
          String(recipePropertiesTmp.id) +
          "",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          let i = 0;

          while (data[i] != undefined) {
            recipePropertiesTmp.ingredients.push({
              ingredient: data[i].text,
              weight: data[i].weight,
            });
            i++;
          }
        })
        .then(() => {
          setRecipeProperties(recipePropertiesTmp);
        })
        .catch((error) => console.error(error));

      setLoading(false);
    }

    let recipePropertiesTmp = {};
    let recipeID;

    // Check if recipe is a Edamam API recipe
    if (window.location.href.indexOf("recipes/recipe_") != -1) {
      recipeID = URLToRecipeID();
      fetchRecipeEdamam();
      setRecipeID(recipeID);
    } else {
      fetchRecipeNotEdamam();
    }
  }, []);

  return (
    <Grid className={classes.main}>
      <PlainTopMenu />
      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid>
          {resultsFound ? (
            <Grid>
              <Grid className={classes.root}>
                <RecipeTopPart
                  recipeProperties={recipeProperties}
                  rating={rating}
                />
                <RecipeIngredients ingredients={recipeProperties.ingredients} />
              </Grid>
              <Grid className={classes.commentSection}>
                <Review recipeID={recipeID} />
                <Subscription recipeID={recipeID} />
                <Reviews recipeID={recipeID} setRating={setRating} />
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <SentimentVeryDissatisfiedIcon className={classes.sadFace} />
              <Typography className={classes.noResultsFoundText}>
                Sorry! We didn't find any results.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}

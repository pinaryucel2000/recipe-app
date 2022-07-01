import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { recipesURL } from "../../util";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FlagIcon from "@material-ui/icons/Flag";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import useStyles from "../../style/home/Recipes";

function Recipe({
  label,
  image,
  totalTime,
  calories,
  servings,
  cuisineType,
  recipeID,
}) {
  const classes = useStyles();
  const recipeImage = {
    backgroundImage: 'url("' + image + '")',
    backgroundSize: "cover",
    minHeight: "200px",
    minWidth: "200px",
  };

  function capitalizeFirstLetter(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  return (
    <Grid className={classes.recipeContainer}>
      <Grid className={classes.flex}>
        <Grid>
          <Grid style={recipeImage}> </Grid>
        </Grid>
        <Grid className={classes.recipeInfo}>
          <Button
            onClick={() => {
              window.location.href = "/recipes/" + recipeID;
            }}
          >
            <Typography className={classes.recipeLabel}>{label}</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.flex}>
        <Grid className={classes.labelContainer}>
          <WatchLaterIcon className={classes.icon} />
          <Typography className={classes.label}>
            {parseInt(parseInt(totalTime) / 60) === 0 ? (
              <div>{totalTime} mins</div>
            ) : (
              <div>
                {parseInt(parseInt(totalTime) / 60)} hr
                {totalTime % 60 === 0 ? (
                  <div></div>
                ) : (
                  <label> and {totalTime % 60} mins</label>
                )}
              </div>
            )}
          </Typography>
        </Grid>

        <Grid className={classes.labelContainer}>
          <WhatshotIcon className={classes.icon} />
          <Typography className={classes.label}>{calories} kcal</Typography>
        </Grid>

        <Grid className={classes.labelContainer}>
          <RestaurantIcon className={classes.icon} />
          <Typography className={classes.label}>{servings} servings</Typography>
        </Grid>

        <Grid className={classes.labelContainer}>
          <FlagIcon className={classes.icon} />
          <Typography className={classes.label}>
            {capitalizeFirstLetter(cuisineType)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Recipes({ diet, mealType, dishType, keyword }) {
  const classes = useStyles();
  const [loading, setLoading] = useState("true");
  const [recipes, setRecipes] = useState([]);
  const [resultsFound, setResultsFound] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      await fetch(
        recipesURL(
          {
            diet: diet,
            mealType: mealType,
            dishType: dishType,
            q: keyword,
          },
          false
        ),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setResultsFound(false);
          } else {
            setResultsFound(true);

            for (let i = 0; i < data.length; i++) {
              recipesTmp.push({
                recipeID: data[i].id,
                label: data[i].label,
                image: data[i].imageURL,
                totalTime: data[i].totalTime,
                calories: parseInt(data[i].calories),
                servings: parseInt(data[i].servings),
                cuisineType: data[i].cuisine,
              });
            }
          }
        })
        .catch((error) => console.error(error));
    }

    async function fetchRecipesEdamam() {
      await fetch(
        recipesURL(
          {
            diet: diet,
            mealType: mealType,
            dishType: dishType,
            q: keyword,
          },
          true
        ),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.hits.length === 0) {
            setResultsFound(false);
          } else {
            setResultsFound(true);

            console.log(data.hits[0].recipe.uri);
            for (let i = 0; i < 20; i++) {
              let recipeID = data.hits[i].recipe.uri;
              recipesTmp.push({
                label: data.hits[i].recipe.label,
                image: data.hits[i].recipe.image,
                totalTime: data.hits[i].recipe.totalTime,
                calories: parseInt(data.hits[i].recipe.calories),
                servings: parseInt(data.hits[i].recipe.yield),
                cuisineType: data.hits[i].recipe.cuisineType,
                recipeID: recipeID.slice(recipeID.indexOf("#") + 1),
              });
            }
          }
        })
        .then(() => {
          setLoading(false);
          let tmp = recipesTmp;
          setRecipes(recipesTmp);
          console.log(recipesTmp);
        })
        .catch((error) => console.error(error));
    }

    setLoading(true);
    let recipesTmp = [];
    fetchRecipes();
    fetchRecipesEdamam();
  }, [diet, mealType, dishType, keyword]);

  return (
    <Grid className={classes.root}>
      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid>
          <Typography className={classes.header}>{mealType} recipes</Typography>
          {keyword === undefined || keyword === "" ? null : (
            <Typography className={classes.subheader}>
              Results for "{keyword}"
            </Typography>
          )}
          {resultsFound ? (
            <div>
              <Grid className={classes.recipesContainer}>
                {recipes.map((recipe, index) => (
                  <Recipe
                    label={recipe.label}
                    image={recipe.image}
                    totalTime={recipe.totalTime}
                    calories={recipe.calories}
                    servings={recipe.servings}
                    cuisineType={recipe.cuisineType}
                    dishType={recipe.dishType}
                    recipeID={recipe.recipeID}
                  />
                ))}
              </Grid>
            </div>
          ) : (
            <Grid className={classes.noResultsFound}>
              <SentimentVeryDissatisfiedIcon className={classes.sadFace} />
              <Typography className={classes.subheader}>
                Sorry! We didn't find any results.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}

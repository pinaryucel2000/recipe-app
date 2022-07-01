import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import PlainTopMenu from "../PlainTopMenu";
import AddRecipeTopPart from "./AddRecipeTopPart";
import AddRecipeIngredients from "./AddRecipeIngredients";
import { getLocalStorage } from "../../localStorage";
import { DJANGO_SERVER } from "../../util";
import useStyles from "../../style/add-recipe/AddRecipe";
import { createBrowserHistory } from "history";

export default function AddRecipe() {
  const classes = useStyles();
  const [recipeProperties, setRecipeProperties] = useState({});
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const isSignedIn = getLocalStorage("userID") != undefined;
  const history = createBrowserHistory();

  if (!isSignedIn) {
    history.replace("/");
    window.location.href = "/";
  }

  const save = (event) => {
    setTrigger(!trigger);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    async function fetchRecipes() {
      let rid;

      const recipe = {
        author: getLocalStorage("userID"),
        label: recipeProperties.label,
        imageURL: recipeProperties.imageURL,
        course: recipeProperties.course,
        cuisine: recipeProperties.cuisine,
        totalTime: recipeProperties.totalTime,
        servings: recipeProperties.servings,
        calories: recipeProperties.calories,
        mealType: recipeProperties.mealType,
        diet: recipeProperties.diet,
      };

      console.log(recipe);

      fetch(DJANGO_SERVER + "/api/recipes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          if (data.id != undefined) {
            window.location.href = "/recipes/" + data.id;
          }
          rid = data.id;

          for (let i = 0; i < recipeIngredients.length; i++) {
            if (recipeIngredients[i].text == "") {
              continue;
            }

            const ingredient = {
              recipe: rid,
              text: recipeIngredients[i].text,
              weight: recipeIngredients[i].weight,
            };

            fetch(DJANGO_SERVER + "/api/ingredients/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(ingredient),
            })
              .then((data) => data.json())
              .then((data) => {})
              .catch((error) => console.error(error));
          }
        })
        .catch((error) => console.error(error));
    }
    fetchRecipes();
  }, [recipeProperties]);

  return (
    <Grid className={classes.main}>
      <PlainTopMenu />
      <Grid>
        <form onSubmit={handleSubmit}>
          <Grid className={classes.root}>
            <AddRecipeTopPart
              setRecipeProperties={setRecipeProperties}
              trigger={trigger}
            />
            <AddRecipeIngredients
              setRecipeIngredients={setRecipeIngredients}
              trigger={trigger}
            />
            <Button type="submit" className={classes.button} onClick={save}>
              Add
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

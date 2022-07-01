import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TopMenu from "./TopMenu";
import Categories from "./Categories";
import Filter from "./Filter";
import Recipes from "./Recipes";
import useStyles from "../../style/home/Home";
import { getLocalStorage } from "../../localStorage";
import { createBrowserHistory } from "history";

export default function Home() {
  const [diet, setDiet] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [dishType, setDishType] = useState("");
  const [keyword, setKeyWord] = useState("");
  const classes = useStyles();

  const isSignedIn = getLocalStorage("userID") != undefined;
  const history = createBrowserHistory();

  if (!isSignedIn) {
    history.replace("/");
    window.location.href = "/";
  }

  return (
    <Grid className={classes.root}>
      <TopMenu setKeyWord_={setKeyWord} />
      <Categories setDishType={setDishType} dishType={dishType} />
      <Grid className={classes.container}>
        <Filter setDiet_={setDiet} setMealType_={setMealType} />
        <Recipes
          diet={diet}
          mealType={mealType}
          dishType={dishType}
          keyword={keyword}
        />
      </Grid>
    </Grid>
  );
}

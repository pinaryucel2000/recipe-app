import React from "react";

// Server
const DJANGO_SERVER = "http://10.2.2.104:8000";
//const DJANGO_SERVER = "http://localhost:8000";

// Edamam Recipe API credentials
const APP_ID = "5c2a12b2";
const APP_KEY = "0303b28b270df87f292d2497cdb60396";

//  Set edamam true to fetch data from third party database
//  This function is used to fetch multiple recipes
const recipesURL = (params, edamam) => {
  let URL;

  if (edamam == true) {
    URL =
      "https://api.edamam.com/api/recipes/v2?app_id=" +
      APP_ID +
      "&app_key=" +
      APP_KEY +
      "&type=public&random =true&field=uri&field=totalTime&field=label&field=calories&field=yield&field=image&field=cuisineType";
  } else {
    URL = DJANGO_SERVER + "/api/recipes/?";
  }

  if (params.diet) {
    URL = URL + "&diet=" + params.diet + "&";
  }

  if (params.mealType) {
    URL = URL + "&mealType=" + params.mealType + "&";
  }

  if (params.dishType) {
    URL = URL + "&dishType=" + params.dishType + "&";
  }

  if (params.q) {
    URL = URL + "&q=" + params.q + "&";
  }

  return URL;
};

// To fetch a single recipe from the third part database whose id is known
const recipeURL = (recipeID) => {
  let URL =
    "https://api.edamam.com/api/recipes/v2/" +
    recipeID +
    "?app_id=" +
    APP_ID +
    "&app_key=" +
    APP_KEY +
    "&type=public";

  return URL;
};

// To fetch a recipe from the third part database whose label is known
const getRecipeIDURL = (label) => {
  let URL =
    "https://api.edamam.com/api/recipes/v2?app_id=" +
    APP_ID +
    "&app_key=" +
    APP_KEY +
    "&type=public&field=uri" +
    "&q=" +
    label;

  return URL;
};

export { recipesURL, recipeURL, getRecipeIDURL, DJANGO_SERVER };

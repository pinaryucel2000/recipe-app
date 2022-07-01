import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StyledCheckbox from "../StyledCheckbox";

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
    fontSize: "23px",
    marginTop: "0.9%",
    display: "flex",
    width: "100%",
  },
  ingredientContainerWeightText: {
    fontSize: "23px",
    marginLeft: "1%",
    color: "#AAB8C2",
    width: "10%",
  },
}));

function Ingredient({ text, weight }) {
  const classes = useStyles();
  const lineThrough = { textDecoration: "line-through" };
  const [checked, setChecked] = useState(false);

  return (
    <Grid className={classes.ingredientContainer}>
      <StyledCheckbox
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <Typography
        className={classes.ingredientContainerText}
        style={checked ? lineThrough : undefined}
      >
        {text}{" "}
        <Typography
          className={classes.ingredientContainerWeightText}
          style={checked ? lineThrough : undefined}
        >
          {parseInt(weight)} gr
        </Typography>
      </Typography>
    </Grid>
  );
}

export default function RecipeIngredients({ ingredients }) {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Typography className={classes.header}>Ingredients</Typography>
      {ingredients ? (
        ingredients.map((ingredient, index) => (
          <Ingredient text={ingredient.ingredient} weight={ingredient.weight} />
        ))
      ) : (
        <div></div>
      )}
    </Grid>
  );
}

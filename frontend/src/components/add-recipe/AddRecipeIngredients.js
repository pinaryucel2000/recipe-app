import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NumberFormat from "react-number-format";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../style/add-recipe/AddRecipeIngredients";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: parseInt(values.value),
          },
        });
      }}
    />
  );
}

function Ingredient({ index }) {
  const classes = useStyles();
  return (
    <Grid id={index} className={classes.ingredientContainer}>
      <FiberManualRecordIcon />

      <TextField
        id="i"
        name="ingredient"
        className={classes.textfield}
        InputProps={{
          className: classes.ingredientContainerText,
        }}
      ></TextField>

      <TextField
        id="w"
        name="weight"
        className={classes.textfield}
        InputProps={{
          endAdornment: <InputAdornment position="end">gr</InputAdornment>,
          className: classes.ingredientContainerWeightText,
          inputComponent: NumberFormatCustom,
        }}
      ></TextField>
      <Button
        className={classes.deleteIcon}
        onClick={() => {
          let elem = document.getElementById(index);
          elem.parentNode.removeChild(elem);
        }}
      >
        <DeleteIcon />
      </Button>
    </Grid>
  );
}

export default function RecipeIngredients({ trigger, setRecipeIngredients }) {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    let tmp = [];
    let ingredients_ = document.getElementsByName("ingredient");
    let weights_ = document.getElementsByName("weight");

    for (let i = 0; i < ingredients.length; i++) {
      tmp.push({
        text: ingredients_[i].value,
        weight: weights_[i].value,
      });
    }

    setRecipeIngredients(tmp);
  }, [trigger]);

  return (
    <Grid className={classes.root}>
      <Typography className={classes.header}>Ingredients</Typography>
      {ingredients ? (
        ingredients.map((ingredient, index) => (
          <Ingredient key={index} index={index} />
        ))
      ) : (
        <div></div>
      )}
      <Button
        color="inherit"
        className={classes.button}
        onClick={() => {
          let tmp = [];

          for (let i = 0; i < ingredients.length; i++) {
            tmp.push(ingredients[i]);
          }

          tmp.push("");
          setIngredients(tmp);
        }}
      >
        <AddCircleIcon className={classes.icon} /> Add ingredient
      </Button>
    </Grid>
  );
}

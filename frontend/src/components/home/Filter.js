import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { DJANGO_SERVER } from "../../util";
import useStyles from "../../style/home/Filter";

export default function Filter({ setDiet_, setMealType_ }) {
  const classes = useStyles();
  const [diet, setDiet] = useState("");
  const [dietTypes, setDietTypes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);

  console.log(dietTypes);

  useEffect(() => {
    async function fetchFilters() {
      await fetch(DJANGO_SERVER + "/api/meals/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            mealTypesTmp.push({
              name: data[i].name,
            });
          }
        })
        .then(() => {
          setMealTypes(mealTypesTmp);
        })
        .catch((error) => console.error(error));

      await fetch(DJANGO_SERVER + "/api/diets/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            dietTypesTmp.push({
              name: data[i].name,
            });
          }
        })
        .then(() => {
          setDietTypes(dietTypesTmp);
        })
        .catch((error) => console.error(error));
    }

    let dietTypesTmp = [];
    let mealTypesTmp = [];
    fetchFilters();
  }, []);

  const handleChange = (event) => {
    setDiet_(event.target.value);
    setDiet(event.target.value);
  };

  const [mealType, setMealType] = useState("Breakfast");

  const handleMealType = (event, newMealType) => {
    setMealType(newMealType);
    setMealType_(newMealType);
  };

  return (
    <Grid className={classes.root}>
      <Typography className={classes.header}>All recipes</Typography>
      <br />
      <Typography className={classes.subheader}>Diet</Typography>
      <RadioGroup value={diet} onChange={handleChange}>
        {dietTypes.map((diet, index) => (
          <FormControlLabel
            value={diet.name}
            control={<Radio color="default" />}
            label={diet.name}
          />
        ))}
      </RadioGroup>
      <br />
      <Typography className={classes.subheader}> Meal type</Typography>
      <Grid className={classes.toggleButtonContainer}>
        {mealTypes.map((mealType_, index) => (
          <ToggleButton
            onChange={handleMealType}
            selected={mealType === mealType_.name}
            value={mealType_.name}
            className={classes.toggleButton}
          >
            {mealType_.name}
          </ToggleButton>
        ))}
      </Grid>
    </Grid>
  );
}

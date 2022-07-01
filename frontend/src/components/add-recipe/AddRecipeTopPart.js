import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FlagIcon from "@material-ui/icons/Flag";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";
import ImageIcon from "@material-ui/icons/Image";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AddRecipeTopPartStyle from "../../style/add-recipe/AddRecipeTopPart";
import { DJANGO_SERVER } from "../../util";

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

export default function AddRecipeTopPart({ setRecipeProperties, trigger }) {
  const classes = AddRecipeTopPartStyle();
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      for (let i = 0; i < 4; i++) {
        await fetch(DJANGO_SERVER + "/api/" + propertyNames[i], {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            for (let j = 0; j < data.length; j++) {
              propertyContents[i].push({
                name: data[j].name,
              });
            }
          })
          .then(() => {
            if (i == 0) {
              setCategories(propertyContents[0]);
            } else if (i == 1) {
              setCuisineTypes(propertyContents[1]);
            } else if (i == 2) {
              setMealTypes(propertyContents[2]);
            } else {
              setDietTypes(propertyContents[3]);
            }
          })
          .catch((error) => console.error(error));
      }
    }

    const propertyNames = ["courses", "cuisines", "meals", "diets"];
    let propertyContents = [[], [], [], []];

    fetchProperties();
  }, []);

  const recipeImage = {
    backgroundImage: 'url("' + imageURL + '")',
    backgroundSize: "cover",
    width: "250px",
    height: "250px",
    marginTop: "20%",
    border: "0.1vw solid",
    backgroundColor: "white",
  };

  return (
    <Grid className={classes.container}>
      <Grid className={classes.left}>
        <Labels
          categories={categories}
          cuisineTypes={cuisineTypes}
          mealTypes={mealTypes}
          dietTypes={dietTypes}
          imageURL={imageURL}
          setImageURL={setImageURL}
          setRecipeProperties={setRecipeProperties}
          trigger={trigger}
        />
      </Grid>
      <Grid className={classes.right}>
        <Grid style={recipeImage}> </Grid>
      </Grid>
    </Grid>
  );
}

function Labels({
  categories,
  cuisineTypes,
  mealTypes,
  dietTypes,
  imageURL,
  setImageURL,
  setRecipeProperties,
  trigger,
}) {
  const classes = AddRecipeTopPartStyle();

  const [label, setLabel] = useState("");
  const [course, setCourse] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDietType] = useState("");

  useEffect(() => {
    if (trigger) {
      let tmp = {};
      tmp.label = label;
      tmp.imageURL = imageURL;
      tmp.course = course.name;
      tmp.cuisine = cuisine.name;
      tmp.totalTime = totalTime;
      tmp.servings = servings;
      tmp.calories = calories;
      tmp.mealType = mealType.name;
      tmp.diet = diet.name;

      setRecipeProperties(tmp);
    }
  }, [trigger]);

  return (
    <Grid>
      <CustomTextField
        label={"Header"}
        value={label}
        setValue={setLabel}
        isHeader={true}
        numberFormat={false}
      />

      <Grid className={classes.labelContainer}>
        <Grid className={classes.flex}>
          <ImageIcon />
          <Typography className={classes.labelTypeText}>Image URL</Typography>
          <CustomTextField
            value={imageURL}
            setValue={setImageURL}
            isHeader={false}
            numberFormat={false}
          />
        </Grid>

        <Grid className={classes.flex}>
          <LocalOfferIcon />
          <Typography className={classes.labelTypeText}>Course</Typography>
          <CustomAutoComplete options={categories} setValue={setCourse} />
        </Grid>

        <Grid className={classes.flex}>
          <FlagIcon />
          <Typography className={classes.labelTypeText}>Cuisine</Typography>
          <CustomAutoComplete options={cuisineTypes} setValue={setCuisine} />
        </Grid>

        <Grid className={classes.flex}>
          <WatchLaterIcon />
          <Typography className={classes.labelTypeText}>Total Time</Typography>
          <CustomTextField
            value={totalTime}
            setValue={setTotalTime}
            isHeader={false}
            suffix={"mins"}
            numberFormat={true}
          />
        </Grid>

        <Grid className={classes.flex}>
          <RestaurantIcon />
          <Typography className={classes.labelTypeText}>Servings</Typography>
          <CustomTextField
            value={servings}
            setValue={setServings}
            isHeader={false}
            numberFormat={true}
          />
        </Grid>

        <Grid className={classes.flex}>
          <WhatshotIcon />
          <Typography className={classes.labelTypeText}>Calories</Typography>
          <CustomTextField
            value={calories}
            setValue={setCalories}
            isHeader={false}
            suffix={"kcal"}
            numberFormat={true}
          />
        </Grid>

        <Grid className={classes.flex}>
          <Brightness4Icon />
          <Typography className={classes.labelTypeText}>Meal Type</Typography>
          <CustomAutoComplete options={mealTypes} setValue={setMealType} />
        </Grid>

        <Grid className={classes.flex}>
          <FitnessCenterIcon />
          <Typography className={classes.labelTypeText}>Diet</Typography>
          <CustomAutoComplete options={dietTypes} setValue={setDietType} />
        </Grid>
      </Grid>
    </Grid>
  );
}
function CustomAutoComplete({ options, setValue }) {
  const classes = AddRecipeTopPartStyle();

  return (
    <Autocomplete
      onChange={(event, value) => setValue(value)}
      style={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.name}
      className={classes.autocomplete}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          variant="outlined"
          margin="normal"
          style={{
            color: "#b34341",
          }}
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{
                  color: "#b34341",
                  fontWeight: part.highlight ? 700 : 400,
                }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

function CustomTextField({
  label,
  value,
  setValue,
  isHeader,
  suffix,
  numberFormat,
}) {
  const classes = AddRecipeTopPartStyle();
  let fontSize;
  if (isHeader) {
    fontSize = "42px";
  } else {
    fontSize = "25px";
  }

  return (
    <TextField
      required
      label={label}
      value={value}
      className={isHeader ? classes.textfieldHeader : classes.textfield}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
        inputComponent: numberFormat ? NumberFormatCustom : undefined,
      }}
      inputProps={{
        style: {
          color: "#b34341",
          fontSize: fontSize,
          fontWeight: "bold",
        },
      }}
      InputLabelProps={{
        style: { color: "#b34341", fontSize: "30px", fontWeight: "bold" },
      }}
      type="integer"
    />
  );
}

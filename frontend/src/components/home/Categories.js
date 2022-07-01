import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { DJANGO_SERVER } from "../../util";
import useStyles from "../../style/home/Categories";

function Category({ dishType, setDishType, name, link }) {
  const classes = useStyles();

  // Dynamic style
  const categoryIcon = {
    backgroundImage: 'url("' + link + '")',
    backgroundSize: "cover",
    height: "70px",
    width: "70px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const selected = {
    borderBottom: "1px solid grey",
  };

  return (
    <Button
      className={classes.categoryButton}
      style={name === dishType ? selected : undefined}
      onClick={() => {
        setDishType(name);
      }}
    >
      <Grid style={categoryIcon}> </Grid>
      {name}
    </Button>
  );
}

export default function Categories({ setDishType, dishType }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      await fetch(DJANGO_SERVER + "/api/courses/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            categoriesTmp.push({
              name: data[i].name,
              link: data[i].image,
            });
          }
        })
        .then(() => {
          setCategories(categoriesTmp);
        })
        .catch((error) => console.error(error));
    }

    let categoriesTmp = [];
    fetchCategories();
  }, []);

  return (
    <Grid className={classes.root}>
      {categories.map((category, index) => (
        <Category
          dishType={dishType}
          setDishType={setDishType}
          name={category.name}
          link={category.link}
        />
      ))}
    </Grid>
  );
}

import React from "react";
import "./style/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AddRecipe from "./components/add-recipe/AddRecipe";
import Recipe from "./components/recipe-details/Recipe";
import Profile from "./components/profile/Profile";
import News from "./components/news/News";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/recipes/:label" component={Recipe}></Route>
          <Route exact path="/recipes" component={Home}></Route>
          <Route exact path="/add-recipe" component={AddRecipe}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/news" component={News}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// import emailjs from "emailjs-com";
// function sendEmail(e) {
//   e.preventDefault();

//   emailjs
//     .sendForm(
//       "service_7mkuczp",
//       "template_dwqk5xo",
//       e.target,
//       "user_oJCgGBUtkgp9y984VzY5I"
//     )
//     .then(
//       (result) => {
//         console.log(result.text);
//       },
//       (error) => {
//         console.log(error.text);
//       }
//     );
// }

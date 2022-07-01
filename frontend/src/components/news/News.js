import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import NewsTopMenu from "./NewsTopMenu";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Article from "./Article";
import Pagination from "@material-ui/lab/Pagination";
import { Typography } from "@material-ui/core";
import useStyles from "../../style/news/News";
import { createBrowserHistory } from "history";
import { getLocalStorage } from "../../localStorage";

export default function News() {
  const classes = useStyles();

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const isSignedIn = getLocalStorage("userID") != undefined;
  const history = createBrowserHistory();

  if (!isSignedIn) {
    history.replace("/");
    window.location.href = "/";
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    async function fetchNews() {
      await fetch(
        "https://newsapi.org/v2/everything?q=recipe&apiKey=740970e434f14d0887f0368f1487b30a&pageSize=10&page=" +
          page,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = 0; i < 11; i++) {
            if (data.articles[i] != undefined) {
              let tmp = data.articles[i];
              console.log(tmp);
              newsTmp.push({
                author: tmp.author,
                title: tmp.title,
                description: tmp.description,
                image: tmp.urlToImage,
                url: tmp.url,
              });
            }
          }
        })
        .then(() => {
          setNews(newsTmp);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
    setLoading(true);
    let newsTmp = [];
    fetchNews();
  }, [page]);

  return (
    <Grid className={classes.root}>
      <NewsTopMenu />
      <Typography className={classes.header}>News</Typography>
      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid className={classes.articleContainer}>
          {news.map((article, index) => (
            <Article
              title={article.title}
              image={article.image}
              description={article.description}
              author={article.author}
              url={article.url}
            />
          ))}
          <Pagination
            className={classes.pagination}
            count={10}
            page={page}
            onChange={handleChange}
            size="large"
            defaultPage={1}
            boundaryCount={2}
            color="primary"
          />
        </Grid>
      )}
    </Grid>
  );
}

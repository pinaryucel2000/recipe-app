import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import useStyles from "../../style/news/Article";

export default function Article({ author, title, description, image, url }) {
  const classes = useStyles();

  const articleImage = {
    backgroundImage: 'url("' + image + '")',
    backgroundSize: "cover",
    minHeight: "200px",
    minWidth: "200px",
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Grid className={classes.articleContainer}>
        <Grid className={classes.flex}>
          <Grid>
            <Grid style={articleImage}> </Grid>
          </Grid>
          <Grid className={classes.articleInfo}>
            <Button
              className={classes.button}
              onClick={() => {
                openInNewTab(url);
              }}
            >
              <Typography className={classes.title}>{title}</Typography>
              <Typography className={classes.author}>{author}</Typography>
              <Typography className={classes.description}>
                {description}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

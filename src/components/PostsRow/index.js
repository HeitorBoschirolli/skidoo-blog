import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostPaper from '../PostPaper';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: "#181818",
      height: "13rem"
    },
  }
});

const PostsRow = () => {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
          <Grid container spacing={3} direction="row">
            <Grid item xs={2}>
              <PostPaper title="Title" description="desc" />
            </Grid>
            <Grid item xs={2}>
              <PostPaper></PostPaper>
            </Grid>
            <Grid item xs={2}>
              <PostPaper></PostPaper>
            </Grid>
            <Grid item xs={2}>
              <PostPaper></PostPaper>
            </Grid>
            <Grid item xs={2}>
              <PostPaper></PostPaper>
            </Grid>
            <Grid item xs={2}>
              <PostPaper></PostPaper>
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default PostsRow;
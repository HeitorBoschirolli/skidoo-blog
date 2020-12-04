import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
}));

const PostsRow = () => {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
          <Grid container spacing="3" xs={11} direction="row" justify="left">
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>item</Paper>
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
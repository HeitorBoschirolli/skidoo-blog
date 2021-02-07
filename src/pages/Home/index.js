import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostPaper from '../../components/PostPaper';
import { Container } from '@material-ui/core';
import { Link } from "react-router-dom";
import { colors } from '../../helpers/colors';
import { StyledLink } from '../../components/Header/styled';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: colors.darkGray,
      height: "13rem"
    },
  }
});

const Home = () => {
  const classes = useStyles();

  function FormRow() {
    return (
      <Container>
          <Grid container spacing={3} direction="row">
            <Grid item xs={2}>
              <StyledLink to="/java-lambda-part-one">
                <PostPaper title="AWS Lambda &amp; Java part I" description="How to use Java in the AWS Lambda functions" />
              </StyledLink>
            </Grid>
            <Grid item xs={2}>
              <StyledLink to="/java-lambda-part-two">
                <PostPaper
                  title="AWS Lambda &amp; Java part II"
                  description="Using IaC and deploy scripts"
                />
              </StyledLink>
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
      </Container>
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

export default Home;
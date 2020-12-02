import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StyledAppBar } from './styled';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} color="red">
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Skidoo Blog
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Home;
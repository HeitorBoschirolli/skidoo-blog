import React from 'react';
import { StyledToolBar, StyledTypography } from './styled';
import { AppBar } from '@material-ui/core';

const Home = () => {
  return (
    <AppBar position="static">
      <StyledToolBar>
        <StyledTypography variant="h6">
          Skidoo Blog
        </StyledTypography>
      </StyledToolBar>
    </AppBar>
  );
};

export default Home;
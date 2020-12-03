import React from 'react';
import { GradientDiv, StyledToolBar, StyledTypography } from './styled';
import { AppBar } from '@material-ui/core';

const Header = () => {
  return (
    <GradientDiv>
      <AppBar position="static">
        <StyledToolBar>
          <StyledTypography variant="h6">
            Skidoo Blog
          </StyledTypography>
        </StyledToolBar>
      </AppBar>
    </GradientDiv>
  );
};

export default Header;
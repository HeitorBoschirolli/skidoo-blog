import React from 'react';
import { GradientDiv, StyledLink, StyledToolBar, StyledTypography } from './styled';
import { AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <GradientDiv>
      <AppBar position="static">
        <StyledToolBar>
          <StyledTypography variant="h6">
            <StyledLink to="/">
              Skidoo Blog
            </StyledLink>
          </StyledTypography>
        </StyledToolBar>
      </AppBar>
    </GradientDiv>
  );
};

export default Header;
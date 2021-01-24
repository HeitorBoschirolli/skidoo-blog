import styled from "styled-components";
import { colors } from "../../helpers/colors";
import { Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

export const StyledToolBar = styled(Toolbar)`
    background-color: ${colors.black};
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

// the negative margin is to compensate for chrome's default margin
export const GradientDiv = styled.div`
    background: rgb(18,18,18);
    background: linear-gradient(
        0deg,
        rgba(18,18,18,1) 0%,
        rgba(25,25,25,1) 100%);
    padding-bottom: 5rem;
    margin: -8px;
`;
import styled from "styled-components";
import { colors } from "../../helpers/colors";
import { Toolbar, Typography } from "@material-ui/core";

export const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

export const StyledToolBar = styled(Toolbar)`
    background-color: ${colors.black};
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
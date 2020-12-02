import styled from "styled-components";
import AppBar from '@material-ui/core/AppBar';
import { colors } from "../../helpers/colors";
import { Toolbar, Typography } from "@material-ui/core";

export const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

export const StyledToolBar = styled(Toolbar)`
    background-color: ${colors.black};
`;
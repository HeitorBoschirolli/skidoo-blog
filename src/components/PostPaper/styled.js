import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../helpers/colors";

export const StyledPaper = styled(Paper)`
    padding: 1rem;
    text-align: center;
    color: white !important;
    background-color: ${colors.darkGray} !important;
    height: 13rem;
    cursor: pointer;
`;
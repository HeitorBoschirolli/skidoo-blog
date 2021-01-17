import React from 'react';
import {StyledPaper} from "./styled";

const PostPaper = (props) => {
    return (
        <StyledPaper onClick={() => console.log('skidoo')}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </StyledPaper>
    );
};

export default PostPaper;

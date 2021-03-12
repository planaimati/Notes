import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`

`;

const Button = (props) => {
  return <StyledButton onClick={props.click}>{props.children}</StyledButton>;
};

export default Button;

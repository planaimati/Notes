import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

const StyledContainer = styled.div`
  height: 10rem;
  width: 80rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledButton = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  border: 2px solid black;
  margin: 2rem;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledMenu = () => {
  const { handleSort } = useContext(AppContext);

  return (
    <StyledContainer>
      <StyledButton onClick={() => handleSort("title")}>
        sort by title
      </StyledButton>
      <StyledButton onClick={() => handleSort("created")}>
        sort by created date
      </StyledButton>
      <StyledButton onClick={() => handleSort("modified")}>
        sort by modified date
      </StyledButton>
    </StyledContainer>
  );
};

export default StyledMenu;

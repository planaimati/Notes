import React from "react";
import styled from "styled-components";
import Form from "./components/Form";
import GlobalStyle from "./theme/GlobalStyle";
import Notes from "./components/Notes";
import StyledMenu from "./components/StyledMenu";
import Popup from "./components/Popup";

const StyledContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
const StyledHeader = styled.h4`
  margin-top: 3rem;
  text-transform: uppercase;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />

      <StyledContainer>
        <Popup></Popup>
        <StyledHeader>notes app</StyledHeader>
        <Form></Form>
        <StyledMenu></StyledMenu>
        <Notes></Notes>
      </StyledContainer>
    </>
  );
};

export default App;

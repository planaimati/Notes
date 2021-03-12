import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import { IoMdClose } from "react-icons/io";

const StyledContainer = styled.div`
  height: 30rem;
  width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f4f5f7;
  display: ${(props) => (props.displayPopup ? "flex" : "none")};
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.26);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 15%;
  padding: 2rem;
`;

const StyledLine = styled.div`
  margin-top: 0.5rem;
  height: 1px;
  width: 100%;
  background: grey;
  align-self: center;
`;

const StyledTextContainer = styled(StyledHeaderContainer)`
  height: 85%;
`;

const StyledCloseButton = styled(IoMdClose)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: black;
  font-size: 3rem;
  cursor: pointer;
`;

const StyledHeader = styled.h2`
  font-weight: 500;
`;
const StyledText = styled.p`
  font-size: 1.5rem;
  letter-spacing: 0.3rem;
`;

const Popup = () => {
  const { popup, popupItem, closePopup } = useContext(AppContext);

  return (
    <StyledContainer displayPopup={popup}>
      <StyledCloseButton onClick={closePopup}></StyledCloseButton>
      <StyledHeaderContainer>
        <StyledHeader>{popupItem.title}</StyledHeader>
      </StyledHeaderContainer>
      <StyledLine></StyledLine>
      <StyledTextContainer>
        <StyledText>{popupItem.content}</StyledText>
      </StyledTextContainer>
    </StyledContainer>
  );
};

export default Popup;

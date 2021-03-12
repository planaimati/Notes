import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  height: 10rem;
  width: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 40px;
  margin: 1rem;
  box-shadow: 1px 7px 9px -3px rgba(0, 0, 0, 0.59);
`;
const StyledTitle = styled.h5`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 300;
  cursor: pointer;
`;

const StyledDate = styled.h6`
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
`;
const StyledTitleContainer = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledDateContainer = styled(StyledTitleContainer)`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.color};
  border-radius: 2.8rem;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 1rem 1rem;
  width: 15rem;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  margin: 1rem;
`;

const SingleNote = (props) => {
  const {
    title,
    created,
    modified,
    handleEdit,
    _id,
    handleDelete,
    handlePopup,
    closePopup,
  } = props;

  return (
    <StyledContainer>
      <StyledTitleContainer>
        <StyledTitle
          onClick={(e) => {
            handlePopup(e);
            closePopup();
          }}
          id={_id}
        >
          {title}
        </StyledTitle>
      </StyledTitleContainer>
      <StyledDateContainer>
        <StyledTitle>created:</StyledTitle>
        <StyledDate>{created}</StyledDate>
      </StyledDateContainer>
      <StyledDateContainer>
        <StyledTitle>modified:</StyledTitle>
        <StyledDate>{modified ? modified : "----"}</StyledDate>
      </StyledDateContainer>
      <StyledButton color="royalblue" id={_id} onClick={(e) => handleEdit(e)}>
        EDIT
      </StyledButton>
      <StyledButton color="red" id={_id} onClick={(e) => handleDelete(e)}>
        DELETE
      </StyledButton>
    </StyledContainer>
  );
};

export default SingleNote;

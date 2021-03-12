import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

const StyledForm = styled.form`
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid black;
`;

const StyledInput = styled.input`
  height: 3rem;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  height: 8rem;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.color ? "royalblue" : "green")};
  border-radius: 2.8rem;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 1.6rem 2.1rem;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
`;

const Form = () => {
  const {
    handleSubmit,
    handleSetInputValue,
    handleSetTextAreaValue,
    inputValue,
    textAreaValue,
    edit,
  } = useContext(AppContext);

  return (
    <StyledForm>
      <StyledInput
        type="text"
        placeholder="title"
        onChange={(e) => handleSetInputValue(e)}
        value={inputValue}
      />
      <StyledTextArea
        placeholder="content"
        onChange={(e) => handleSetTextAreaValue(e)}
        value={textAreaValue}
      ></StyledTextArea>
      <StyledButton color={edit} type="submit" onClick={(e) => handleSubmit(e)}>
        {edit ? "EDIT" : "SEND"}
      </StyledButton>
    </StyledForm>
  );
};

export default Form;

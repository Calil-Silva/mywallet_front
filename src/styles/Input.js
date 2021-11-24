import styled from "styled-components";
import theme from "./theme";

const Input = styled.input`
  width: calc(100vw - 50px);
  height: 58px;
  margin-bottom: 13px;
  font-family: "Raleway", sans-serif;
  color: ${theme.dark};
  font-size: 20px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding-left: 15px;
  ::placeholder {
    font-family: "Raleway", sans-serif;
    color: black;
    font-size: 20px;
  }
`;

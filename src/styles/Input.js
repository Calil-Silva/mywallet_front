import styled from "styled-components";
import theme from "./theme";
import font from "../styles/font";

const Input = styled.input`
  width: calc(100vw - 50px);
  height: ${({ button }) => (button ? "46px" : "58px")};
  margin-bottom: 13px;
  font-family: ${font.general};
  color: ${({ button }) => (button ? theme.white : theme.dark)};
  font-weight: ${({ button }) => (button ? "bold" : "initial")};
  font-size: 20px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding-left: 15px;
  background-color: ${({ button }) =>
    button ? theme.lightPurple : theme.white};
  display: ${({ show }) => (show ? "initial" : "none")};
  ::placeholder {
    font-family: ${font.general};
    color: black;
    font-size: 20px;
  }
`;

export default Input;

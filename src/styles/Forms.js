import styled from "styled-components";
import theme from "./theme";
import font from "./font";
import { Link } from "react-router-dom";

const Body = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  height: 50px;
  width: 147px;
  margin: 0 auto 24px;
  font-family: ${font.header};
  font-size: 32px;
  color: ${theme.white};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Register = styled.div`
  margin-top: 36px;
  text-align: center;
  span {
    height: 18px;
    color: ${theme.white};
    font-weight: bold;
    font-size: 15px;
  }
`;

const Links = styled(Link)`
  height: 18px;
  color: ${theme.white};
  font-weight: bold;
  font-size: 15px;
`;

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
  cursor: ${({ button }) => (button ? "pointer" : "initial")};
  background-color: ${({ button }) =>
    button ? theme.lightPurple : theme.white};

  ::placeholder {
    font-family: ${font.general};
    color: ${theme.dark};
    font-size: 20px;
  }
`;

export { Input, Body, Header, Form, Register, Links };

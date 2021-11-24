import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { postUser } from "../services/api.js";
import Input from "../styles/Input.js";
import font from "../styles/font.js";
import theme from "../styles/theme.js";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const history = useHistory();

  function handleUserSignUp(e) {
    e.preventDefault();
    if (name && email && password && confirmedPassword) {
      postUser({
        name,
        email,
        password,
        confirmedPassword,
      })
        .then(() => signin())
        .catch((err) => handleError(err.response.status));
    }
  }

  function signin() {
    alert("Registro efetuado com sucesso!");
    history.push("/");
  }

  function handleError(errorCode) {
    if (errorCode === 409) {
      alert("Email já registrado!");
    } else if (errorCode === 406) {
      alert("Senha incorreta!");
    } else {
      alert("Ocorreu um erro inesperado");
    }
  }

  return (
    <Body>
      <div>
        <Header>MyWallet</Header>
        <Form>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirme a senha"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          <Input
            type="submit"
            value="Cadastrar"
            button={true}
            onClick={(e) => handleUserSignUp(e)}
          />
        </Form>
        <Link to="/">
          <Signin>
            <span>Já tem uma conta? Entre agora!</span>
          </Signin>
        </Link>
      </div>
    </Body>
  );
}

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

const Signin = styled.div`
  margin-top: 36px;
  text-align: center;
  span {
    height: 18px;
    color: ${theme.white};
    font-weight: bold;
    font-size: 15px;
  }
`;

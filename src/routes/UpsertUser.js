import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { postLogin, postUser } from "../services/api.js";
import { getUserData, storeUserData } from "../services/loginPersistence.js";
import font from "../styles/font.js";
import Input from "../styles/Input.js";
import theme from "../styles/theme.js";
import { useParams } from "react-router";

export default function UpsertUser() {
  const [signInCredentials, setSignInCredentials] = useState({
    email: "",
    password: "",
  });

  const [signUpCredentials, setSignUpCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const history = useHistory();
  const { userStatus } = useParams();

  useEffect(() => {
    const userStoredLogin = getUserData();

    if (userStoredLogin) {
      history.push(`/balances/${userStoredLogin.name}`);
    }
  }, [history]);

  function handleLoginSubmit(e) {
    e.preventDefault();

    const userLogin = {
      email: signInCredentials.email,
      password: signInCredentials.password,
    };

    postLogin(userLogin)
      .then((res) => {
        storeUserData(res.data);
        history.push(`/balances/${res.data.name}`);
      })
      .catch((err) => alert(err.response.data.message));
  }

  function handleUserSignUp(e) {
    e.preventDefault();

    const validSignUpCredentials =
      signUpCredentials.name &&
      signUpCredentials.email &&
      signUpCredentials.password &&
      signUpCredentials.confirmedPassword;

    if (validSignUpCredentials) {
      postUser({
        name: signUpCredentials.name,
        email: signUpCredentials.email,
        password: signUpCredentials.password,
        confirmedPassword: signUpCredentials.confirmedPassword,
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
            value={signUpCredentials.name}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                name: e.target.value,
              })
            }
            show={userStatus === "signup" && true}
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={signUpCredentials.email}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                email: e.target.value,
              })
            }
            show={userStatus === "signup" && true}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={signUpCredentials.password}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                password: e.target.value,
              })
            }
            show={userStatus === "signup" && true}
          />
          <Input
            type="password"
            placeholder="Confirme a senha"
            value={signUpCredentials.confirmedPassword}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                confirmedPassword: e.target.value,
              })
            }
            show={userStatus === "signup" && true}
          />
          <Input
            type="submit"
            value="Cadastrar"
            button={true}
            onClick={(e) => handleUserSignUp(e)}
            show={userStatus === "signup" && true}
          />

          <Input
            type="email"
            placeholder="E-mail"
            value={signInCredentials.email}
            onChange={(e) =>
              setSignInCredentials({
                ...signInCredentials,
                email: e.target.value,
              })
            }
            show={userStatus === "signup" ? false : true}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={signInCredentials.password}
            onChange={(e) =>
              setSignInCredentials({
                ...signInCredentials,
                password: e.target.value,
              })
            }
            show={userStatus === "signup" ? false : true}
          />
          <Input
            type="submit"
            value="Entrar"
            button={true}
            onClick={(e) => handleLoginSubmit(e)}
            show={userStatus === "signup" ? false : true}
          />
        </Form>
        <Register>
          {userStatus === "signup" ? (
            <Links to="/">Já tem uma conta? Entre agora!</Links>
          ) : (
            <Links to="/signup">Primeira vez? Cadastra-se</Links>
          )}
        </Register>
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

import { useState } from "react";
import { postUser } from "../services/api.js";
import { Input, Body, Header, Form, Register, Links } from "../styles/Forms.js";
import { useHistory } from "react-router";

export default function SignUp() {
  const history = useHistory();
  const [signUpCredentials, setSignUpCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

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
          />
          <Input
            type="submit"
            value="Cadastrar"
            button={true}
            onClick={(e) => handleUserSignUp(e)}
          />
        </Form>
        <Register>
          <Links to="/">Já tem uma conta? Entre agora!</Links>
        </Register>
      </div>
    </Body>
  );
}

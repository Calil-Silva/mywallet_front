import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserData, storeUserData } from "../services/loginPersistence.js";
import { postLogin } from "../services/api.js";
import { Input, Body, Header, Form, Register, Links } from "../styles/Forms.js";

export default function SignIn() {
  const history = useHistory();
  const [signInCredentials, setSignInCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userStoredLogin = getUserData();

    if (userStoredLogin) {
      history.push(`/balances`);
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
        history.push(`/balances`);
      })
      .catch((err) => alert(err.response.data.message));
  }

  return (
    <Body>
      <div>
        <Header>MyWallet</Header>
        <Form>
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
          />
          <Input
            type="submit"
            value="Entrar"
            button={true}
            onClick={(e) => handleLoginSubmit(e)}
          />
        </Form>
        <Register>
          <Links to="/signup">Primeira vez? Cadastra-se</Links>
        </Register>
      </div>
    </Body>
  );
}

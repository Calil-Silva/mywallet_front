import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { postLogin } from "../services/api.js";
import { getUserData, storeUserData } from "../services/loginPersistence.js";
import Input from "../styles/Input.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const userStoredLogin = getUserData();

    if (userStoredLogin) {
      history.push("/balances");
    }
  }, [history]);

  function handleLoginSubmit(e) {
    e.preventDefault();

    const userLogin = {
      email,
      password,
    };

    postLogin(userLogin)
      .then((res) => {
        storeUserData(res.data);
        history.push("/balances");
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
            type="submit"
            value="Entrar"
            button={true}
            onClick={(e) => handleLoginSubmit(e)}
          />
        </Form>
        <Link to="/signup">
          <Register>
            <span>Primeira vez? Cadastra-se</span>
          </Register>
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
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: #fff;
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
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    font-family: "Raleway", sans-serif;
  }
`;

import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { postUser } from "../services/api.js";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const history = useHistory();

    function handleUserSignUp(e) {
        e.preventDefault();
        if(name && email && password && confirmedPassword) {
            postUser({
                name,
                email,
                password,
                confirmedPassword
            })
                .then(() => signin())
                .catch(err => handleError(err.response.status));
        }
    }

    function signin() {
        alert("Registro efetuado com sucesso!");
        history.push("/");
    }

    function handleError(errorCode) {
        if(errorCode === 409) {
            alert("Email já registrado!")
        } else if(errorCode === 406) {
            alert("Senha incorreta!")
        } else {
            alert("Ocorreu um erro inesperado");
        }
    }

    return (
        <Body>
            <div>
                <Header>
                    MyWallet
                </Header>
                <Form>
                    <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirme a senha" value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} />
                    <button onClick={(e) => handleUserSignUp(e)}>Cadastrar</button>
                </Form>
                <Link to="/">
                    <Signin>
                        <span>Já tem uma conta? Entre agora!</span>
                    </Signin>
                </Link>
            </div>
        </Body>
    )
}

const Body = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    height:50px;
    width: 147px;
    margin: 0 auto 24px;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #fff;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: calc(100vw - 50px);
        height: 58px;
        margin-bottom: 13px;
        font-family: 'Raleway', sans-serif;
        color: black;
        font-size: 20px;
        border-radius: 5px;
        border: none;
        outline: none;
        padding-left: 15px;
        ::placeholder {
            font-family: 'Raleway', sans-serif;
            color: black;
            font-size: 20px;
        }
    }
    button {
        background-color: #A328D6;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        width: calc(100vw - 50px);
        height: 46px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        border: none;
    }
`

const Signin = styled.div`
    margin-top: 36px;
    text-align: center;
    span {
        height: 18px;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        font-family: 'Raleway', sans-serif;
    }
`

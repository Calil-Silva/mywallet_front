import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { postLogin } from "../services/api.js";
import { getUserData, storeUserData } from "../services/loginPersistence.js";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        const userStoredLogin = getUserData();
        if (userStoredLogin) {
            history.push('/balances');
        }
    }, [history]);

    function handleLoginSubmit(e) {
        e.preventDefault();
        const userLogin = {
            email,
            password
        }
        postLogin(userLogin)
            .then(res => {
                storeUserData(res.data);
                history.push('/balances');
            })
            .catch(err => handleError(err.response.status, err.response.data.message))
    }

    function handleError(errorCode, errorMsg) {
        if (errorCode === 403) {
            alert("E-mail/senha incorretos");
        } else if(errorCode === 404) {
            alert(errorMsg);
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
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={(e) => handleLoginSubmit(e)}>Entrar</button>
                </Form>
                <Link to="/signup">
                    <Register>
                        <span>Primeira vez? Cadastra-se</span>
                    </Register>
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
`;

const Header = styled.div`
    height:50px;
    width: 147px;
    margin: 0 auto 24px;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #fff;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: calc( 100vw - 50px );
        height: 58px;
        margin-bottom: 13px;
        font-family: 'Raleway', sans-serif;
        color: black;
        font-size: 20px;
        border-radius: 5px;
        outline: none;
        border: none;
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
        width: calc( 100vw - 50px );
        height: 46px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        border: none;
    }
`;

const Register = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
        height: 18px;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        font-family: 'Raleway', sans-serif;
        margin-top: 36px;
    }
`;

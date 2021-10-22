import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { getLoggedUser } from "../services/api.js";
import { useEffect } from "react";
import { getUserData, removeUserData } from "../services/loginPersistence.js";
import { useState } from "react/cjs/react.development";
import { useHistory } from "react-router";
import Entries from "../components/Entries.js";
import { Link } from "react-router-dom";
import { postLogout } from "../services/api.js";

export default function Logs() {
    const [loggedUserData, setLoggedUserData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const token = getUserData()?.token;
        getLoggedUser(token)
            .then(res => setLoggedUserData(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    alert("Acesso negado!");
                    history.push("/");
                } else {
                    alert("Ocorreu um erro inesperado, entre novamente");
                    history.push("/");
                }
            })
    }, [history])

    function signout() {
        const token = getUserData()?.token;
        postLogout(token)
            .then(() => {
                removeUserData();
                history.push("/");
            })
            .catch(err => handleError(err.response.status))
    }

    function handleError(errorCode) {
        if(errorCode === 401) {
            alert("E-mail de autenticação enviado ao usuário desta conta.")
        } else {
            alert("Ocorreu um erro inesperado, entre novamente")
        }
    }

    const sumBalances = loggedUserData.reduce((previousValue, currentValue) => {
        return previousValue += Number(currentValue.balance);
    }, 0);

    return (
        <Body>
            <Header>
                Olá, Fulano
                <Logout onClick={signout}/>
            </Header>
            <EntriesContainer>
            <EntriesBox>
                {loggedUserData.map((entry, index) => {
                    return <Entries key={index} {...entry} />
                })}
            </EntriesBox>
                <Balance sumBalances={sumBalances}>
                    <span>
                        Saldo
                    </span>
                    <span>
                        {(sumBalances).toFixed(2)}
                    </span>
                </Balance>
            </EntriesContainer>
            <EntriesOptions>
                <Link to="/addcredit">
                <button>
                    <AddCredits {...loggedUserData} />
                    <span>{'Nova\nentrada'}</span>
                </button>
                </Link>
                <Link to="/adddebit">
                <button>
                    <AddDebits />
                    <span>{'Nova\nsaída'}</span>
                </button>
                </Link>
            </EntriesOptions>
        </Body>
    )
}

const Body = styled.div`
    padding: 25px 25px 10px;
`;

const Header = styled.div`
    height: 31px;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logout = styled(RiLogoutBoxRLine)`
    font-size:35px;
`;

const EntriesContainer = styled.div`
    width: 100%;
    height: calc( 100vh - 13px - 22px - 35px - 114px - 25px - 10px);
    background-color: white;
    border-radius: 5px;
    margin: 22px 0 13px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: black;
    padding: 23px 12px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Balance = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;
    font-size: 17px;
    span:first-child {
        font-weight: bold;
    }
    span:last-child {
        color: ${props => Number(props.sumBalances) > 0 ? 'green' : 'red'};
    }
`;

const EntriesOptions = styled.div`
    display: flex;
    justify-content: space-between;
    button {
    width: calc( (100vw - 15px - 50px) / 2);
    height: 114px;
    border-radius: 5px;
    background-color: #A328D6;
    border: none;
    padding: 9px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
        span {
            color: #fff;
            font-family: 'Raleway', sans-serif;
            font-size: 17px;
            font-weight: bold;
            white-space: pre-wrap;
            text-align: left;
        }
    }
`;

const AddCredits = styled(IoMdAddCircleOutline)`
    font-size: 25px;
    top: 9px;
    left: 9px;
    color: #fff;
`;

const AddDebits = styled(HiOutlineMinusCircle)`
        font-size: 25px;
    top: 9px;
    left: 9px;
    color: #fff;
`;

const EntriesBox = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    overflow-y: scroll;
`;
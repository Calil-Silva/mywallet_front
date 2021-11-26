import styled, { css } from "styled-components/macro";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { getLoggedUser, postLogout } from "../services/api.js";
import { useEffect, useState } from "react";
import { getUserData, removeUserData } from "../services/loginPersistence.js";
import { Link, useHistory } from "react-router-dom";
import Entry from "../components/Entry.js";
import theme from "../styles/theme.js";
import font from "../styles/font.js";

export default function Balances() {
  const [loggedUserData, setLoggedUserData] = useState([]);
  const history = useHistory();
  const name = getUserData()?.name;

  useEffect(() => {
    let token = getUserData()?.token && getUserData().token;

    function handleError(errorMsg) {
      alert(errorMsg);
      removeUserData();
      history.push("/");
    }

    getLoggedUser(token)
      .then((res) => setLoggedUserData(res.data))
      .catch((err) => handleError(err.response.data.message));
  }, [history]);

  function signout() {
    const token = getUserData()?.token;
    postLogout(token)
      .then(() => {
        removeUserData();
        history.push("/");
      })
      .catch((err) =>
        handleErrorLogout(err.response.status, err.response.data.message)
      );
  }

  function handleErrorLogout(errorCode, errorMsg) {
    if (errorCode === 401) {
      alert(errorMsg);
      removeUserData();
      history.push("/");
    } else {
      alert(errorMsg);
    }
  }

  const sumBalances = loggedUserData.reduce((previousValue, currentValue) => {
    return (previousValue += Number(currentValue.balance));
  }, 0);

  return (
    <Body>
      <Header>
        {`Olá, ${name}`}
        <Logout onClick={signout} />
      </Header>
      <EntriesContainer>
        <EntriesBox>
          {loggedUserData.length > 0
            ? loggedUserData.map((entry, index) => {
                return <Entry key={index} {...entry} />;
              })
            : "Você ainda não tem um histórico."}
        </EntriesBox>
        <Balance sumBalances={sumBalances}>
          <span>Saldo</span>
          <span>{sumBalances.toFixed(2)}</span>
        </Balance>
      </EntriesContainer>
      <EntriesOptions>
        <Link to={`/balances/addcredit`}>
          <button>
            <AddCredits />
            <span>{"Nova\nentrada"}</span>
          </button>
        </Link>
        <Link to={`/balances/adddebit`}>
          <button>
            <AddDebits />
            <span>{"Nova\nsaída"}</span>
          </button>
        </Link>
      </EntriesOptions>
    </Body>
  );
}

const Icons = css`
  font-size: 25px;
  top: 9px;
  left: 9px;
  color: ${theme.white};
`;

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
  font-size: 35px;
`;

const EntriesContainer = styled.div`
  width: 100%;
  height: calc(100vh - 13px - 22px - 35px - 114px - 25px - 10px);
  background-color: white;
  border-radius: 5px;
  margin: 22px 0 13px;
  font-family: "Raleway", sans-serif;
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
  font-family: "Raleway", sans-serif;
  font-size: 17px;
  height: 20px;
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    color: ${(props) => (Number(props.sumBalances) > 0 ? "green" : "red")};
  }
`;

const EntriesOptions = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: calc((100vw - 15px - 50px) / 2);
    height: 114px;
    border-radius: 5px;
    background-color: ${theme.lightPurple};
    border: none;
    padding: 9px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      color: #fff;
      font-family: ${font.general};
      font-size: 17px;
      font-weight: bold;
      white-space: pre-wrap;
      text-align: left;
    }
  }
`;

const AddCredits = styled(IoMdAddCircleOutline)`
  ${Icons}
`;

const AddDebits = styled(HiOutlineMinusCircle)`
  ${Icons}
`;

const EntriesBox = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  overflow-y: scroll;
  border-top: 1px solid ${theme.lightGreen};
  border-bottom: 1px solid ${theme.lightGreen};
  padding-top: 10px;
`;

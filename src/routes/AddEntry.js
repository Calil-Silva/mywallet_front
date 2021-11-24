import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { postEntry } from "../services/api.js";
import { getUserData, removeUserData } from "../services/loginPersistence.js";
import { useParams } from "react-router";
import Input from "../styles/Input.js";

export default function AddEntry() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  let entry;
  const { entryType, user, userStatus } = useParams();

  if (entryType === "addcredit") {
    entry = {
      value: value < 0 ? -value : value,
      name: "Nova Entrada",
    };
  }

  if (entryType === "adddebit") {
    entry = {
      value: value > 0 ? -value : value,
      name: "Nova saída",
    };
  }

  function postNewEntry(e) {
    e.preventDefault();
    const token = getUserData()?.token;
    postEntry(token, {
      date: new Date(),
      description,
      balance: entry.value,
    })
      .then((res) => handleSuccess(res.data.message))
      .catch((err) =>
        handleError(err.response.status, err.response.data.message)
      );
  }

  function handleSuccess(successMsg) {
    alert(successMsg);
    setValue("");
    setDescription("");
  }

  function handleError(errorCode, errorMsg) {
    if (errorCode === 401) {
      alert(errorMsg);
      removeUserData();
      history.push("/");
    } else {
      alert(errorMsg);
    }
  }

  return (
    <Body>
      <Header>
        {entry.name}
        <Link to={`/balances/${user}`}>
          <RiArrowGoBackFill style={{ color: "white" }} />
        </Link>
      </Header>
      <form>
        <Input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          show={userStatus === "signup" ? false : true}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          show={userStatus === "signup" ? false : true}
        />
        <Input
          type="submit"
          value="Salvar entrada"
          onClick={(e) => postNewEntry(e)}
          button={true}
          show={userStatus === "signup" ? false : true}
        />
      </form>
    </Body>
  );
}

const Body = styled.div`
  padding: 25px 25px 10px;
`;

const Header = styled.div`
  height: 31px;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

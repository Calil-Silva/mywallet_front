import styled from "styled-components";

export default function AddCredit() {
    return (
        <Body>
            <Header>
                Nova Entrada
            </Header>
            <Form>
                <input type="number" placeholder="Valor" />
                <input type="text" placeholder="Descrição" />
                <input type="submit" value="Salvar entrada" />
            </Form>
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
    margin-bottom: 40px;
`;

const Form = styled.form`
    input {
        height: 58px;
        width: calc(100vw - 50px);
        border: none;
        border-radius: 5px;
        outline: none;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 13px;
        padding-left: 15px;
        ::placeholder {
            color: black;
            font-size: 20px;
            font-family: 'Raleway', sans-serif;
        }
    }

    input:last-child {
        font-weight: bold;
        background-color: #A328D6;
        color: #fff;
    }
`
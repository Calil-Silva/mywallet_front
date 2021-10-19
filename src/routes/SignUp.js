import styled from "styled-components"

export default function SignUp() {
    return (
        <Body>
            <div>
            <Header>
                MyWallet
            </Header>
            <Form>
                <input type="text" placeholder="Nome"/>
                <input type="email" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <input type="password" placeholder="Confirme a senha"/>
            </Form>
            <Send>
                <button>Cadastrar</button>
                <span>Já tem uma conta? Entre agora!</span>
            </Send>
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

const Form = styled.div`
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
`

const Send = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    span {
        height: 18px;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        font-family: 'Raleway', sans-serif;
        margin-top: 36px;
    }
`

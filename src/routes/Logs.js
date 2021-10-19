import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi"

export default function Logs() {
    return (
        <Body>
            <Header>
                Olá, Fulano
                <Logout />
            </Header>
            <EntriesContainer>
                <Entries>
                    <Entry>
                        <div>
                            <span>
                                30/11
                            </span>
                            <span>
                                Almoço mãe
                            </span>
                        </div>
                        <span>
                            39,90
                        </span>
                    </Entry>
                </Entries>
                <Balance>
                    <span>
                        Saldo
                    </span>
                    <span>
                        2849,96
                    </span>
                </Balance>
            </EntriesContainer>
            <EntriesOptions>
                <button>
                    <AddCredits />
                    <span>{'Nova\nentrada'}</span>
                </button>
                <button>
                    <AddDebits />
                    <span>{'Nova\nsaída'}</span>
                </button>
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

const Entries = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    overflow-y: scroll;
`;

const Entry = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
        div {
            span:first-child {
                margin-right: 10px;
            }
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

const Balance = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;
    font-size: 17px;
    span:first-child {
        font-weight: bold;
    }
`

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
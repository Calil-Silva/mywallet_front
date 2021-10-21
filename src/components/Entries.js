import styled from "styled-components"

export default function Entries(props) {

    const {
        date,
        description,
        balance
    } = props;

    return (
        <Entry>
            <div>
                <span>
                    {date}
                </span>
                <span>
                    {description}
                </span>
            </div>
            <Total balance={balance}>
                {balance}
            </Total>
        </Entry>
    )
}

const Entry = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
        div {
            span:first-child {
                margin-right: 10px;
                color: #C6C6C6;
            }
        }
`;

const Total = styled.div`
    color: ${(props) => (Number(props.balance) > 0 ? 'green' : 'red')}
` 




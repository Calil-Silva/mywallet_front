import styled from "styled-components";

export default function Entry(props) {
  const { date, description, balance } = props;

  return (
    <EntryContainer>
      <div>
        <span>{date}</span>
        <span>{description}</span>
      </div>
      <Total balance={balance}>{Number(balance).toFixed(2)}</Total>
    </EntryContainer>
  );
}

const EntryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  div {
    span:first-child {
      margin-right: 10px;
      color: #c6c6c6;
    }
  }
`;

const Total = styled.div`
  color: ${(props) => (Number(props.balance) > 0 ? "green" : "red")};
`;

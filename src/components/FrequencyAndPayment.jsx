import styled from "styled-components";
import OrderFrequency from "./OrderFrequency";
import PaymentMethod from "./PaymentMethod";

const StyledFrequencyAndPayment = styled.div`
  display: grid;
  align-content: space-between;
  row-gap: 32px;
`;

const FrequencyAndPayment = () => {
  return (
    <StyledFrequencyAndPayment>
      <OrderFrequency />
      <PaymentMethod />
    </StyledFrequencyAndPayment>
  );
};

export default FrequencyAndPayment;

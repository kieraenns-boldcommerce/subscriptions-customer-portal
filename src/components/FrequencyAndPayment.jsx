import PT from "prop-types";
import styled from "styled-components";
import OrderFrequency, { OrderFrequencyPropTypes } from "./OrderFrequency";


const FrequencyAndPaymentPropTypes = {
  orderFrequency: PT.shape(OrderFrequencyPropTypes).isRequired,
  paymentMethod: PT.shape({}).isRequired
};

const FrequencyAndPaymentDefaultProps = {};


const StyledFrequencyAndPayment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FrequencyAndPayment = (props) => {
  const { orderFrequency } = props;
  const { options, onSave, showEditButton } = orderFrequency;

  return (
    <StyledFrequencyAndPayment>
      <OrderFrequency 
        options={options}
        onSave={onSave}
        showEditButton={showEditButton}
      />
    </StyledFrequencyAndPayment>
  );
};

FrequencyAndPayment.propTypes = FrequencyAndPaymentPropTypes;
FrequencyAndPayment.defaultProps = FrequencyAndPaymentDefaultProps;

export default FrequencyAndPayment;

import PT from "prop-types";
import styled from "styled-components";
import OrderFrequency, { OrderFrequencyPropTypes } from "./OrderFrequency";


const FrequencyAndPaymentPropTypes = {
  orderFrequency: PT.shape(OrderFrequencyPropTypes).isRequired,
  paymentMethod: PT.shape({}).isRequired
};

const FrequencyAndPaymentDefaultProps = {};


const StyledOrderFrequency = styled.div`
  margin-bottom: 22px;
`;

const FrequencyAndPayment = (props) => {
  const { orderFrequency } = props;
  const { options, onSave, editMode } = orderFrequency;

  return (
    <div>
      <StyledOrderFrequency>
        <OrderFrequency
          options={options}
          onChange={onSave}
          editMode={editMode}
        />
      </StyledOrderFrequency>
    </div>
  );
};

FrequencyAndPayment.propTypes = FrequencyAndPaymentPropTypes;
FrequencyAndPayment.defaultProps = FrequencyAndPaymentDefaultProps;

export default FrequencyAndPayment;

import PT from "prop-types";
import styled from "styled-components";
import OrderFrequency from "./OrderFrequency";
import PaymentMethod from "./PaymentMethod";


const FrequencyAndPaymentPropTypes = {
  editModeFrequency: PT.bool,
  editModePayment: PT.bool,
  onEditFrequency: PT.func,
  onEditPayment: PT.func
};

const FrequencyAndPaymentDefaultProps = {
  editModeFrequency: false,
  editModePayment: false
};


const StyledFrequencyAndPayment = styled.div`
  display: grid;
  align-content: space-between;
  row-gap: 32px;
`;

const FrequencyAndPayment = (props) => {
  const {
    editModeFrequency,
    editModePayment,
    onEditFrequency,
    onEditPayment
  } = props;

  const onFrequencyChangeButtonClick = (option) => onEditFrequency && onEditFrequency(option);

  return (
    <StyledFrequencyAndPayment>
      <OrderFrequency
        onChange={onFrequencyChangeButtonClick}
        onEdit={onEditFrequency}
        editMode={editModeFrequency}
      />
      <PaymentMethod
        onEdit={onEditPayment}
        editMode={editModePayment}
      />
    </StyledFrequencyAndPayment>
  );
};

FrequencyAndPayment.propTypes = FrequencyAndPaymentPropTypes;
FrequencyAndPayment.defaultProps = FrequencyAndPaymentDefaultProps;

export default FrequencyAndPayment;

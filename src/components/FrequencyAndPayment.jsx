import PT from "prop-types";
import styled from "styled-components";
import OrderFrequency, { OptionPropTypes } from "./OrderFrequency";
import PaymentMethod from "./PaymentMethod";


const FrequencyAndPaymentPropTypes = {
  options: PT.arrayOf(PT.shape(OptionPropTypes)).isRequired,
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
    options,
    editModeFrequency,
    editModePayment,
    onEditFrequency,
    onEditPayment
  } = props;

  const onFrequencyChangeButtonClick = (option) => onEditFrequency && onEditFrequency(option);

  return (
    <StyledFrequencyAndPayment>
      <OrderFrequency
        options={options}
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

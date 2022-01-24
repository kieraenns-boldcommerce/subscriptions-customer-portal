import PT from "prop-types";
import styled from "styled-components";
import OrderFrequency, { OptionPropTypes } from "./OrderFrequency";
import PaymentMethod from "./PaymentMethod";


const FrequencyAndPaymentPropTypes = {
  options: PT.arrayOf(PT.shape(OptionPropTypes)).isRequired,
  editMode: PT.bool,
  onFrequencyChange: PT.func,
  onPaymentEdit: PT.func,
  onEdit: PT.func
};

const FrequencyAndPaymentDefaultProps = {};


const StyledOrderFrequency = styled.div`
  margin-bottom: 22px;
`;

const FrequencyAndPayment = (props) => {
  const { options, editMode, onFrequencyChange, onPaymentEdit } = props;

  const onFrequencyChangeButtonClick = (option) => onFrequencyChange && onFrequencyChange(option);

  return (
    <div>
      <StyledOrderFrequency>
        <OrderFrequency
          options={options}
          onChange={onFrequencyChangeButtonClick}
          editMode={editMode}
        />
      </StyledOrderFrequency>
      <PaymentMethod
        options={options}
        onEdit={onPaymentEdit}
        editMode={editMode}
      />
    </div>
  );
};

FrequencyAndPayment.propTypes = FrequencyAndPaymentPropTypes;
FrequencyAndPayment.defaultProps = FrequencyAndPaymentDefaultProps;

export default FrequencyAndPayment;

import PT from "prop-types";
import TitleWithEditButton from "./TitleWithEditButton";
import cardLogo from "../assets/images/visa.png";
import styled from "styled-components";


export const PaymentMethodPropTypes = {
  onEdit: PT.func,
  editMode: PT.bool
};

const PaymentMethodDefaultProps = {
  editMode: false
};


const StyledTitle = styled.div`
  margin-bottom: 8px;
`;

const StyledPaymentContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 4px;

  font-size: 14px;
  line-height: 20px;
`;

const StyledPaymentImage = styled.img`
  max-width: 100%;
`;

const PaymentMethod = (props) => {
  const { editMode, onEdit } = props;

  const onOpenForm = () => onEdit && onEdit();
  

  return (
    <div>
      <StyledTitle>
        <TitleWithEditButton
          title="Payment method"
          showEditButton={editMode}
          altTextButton="Change payment method"
          onEdit={onOpenForm}
        />
      </StyledTitle>

      <StyledPaymentContent>
        Credit card - 
        <StyledPaymentImage src={cardLogo} />
        ending in 9111 - Expires 11/22
      </StyledPaymentContent>
    </div>
  );
};

PaymentMethod.propTypes = PaymentMethodPropTypes;
PaymentMethod.defaultProps = PaymentMethodDefaultProps;

export default PaymentMethod;

import { useContext } from "react";
import PT from "prop-types";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import visaIcon from "../assets/icons/cards/visa.svg";
import mastercardIcon from "../assets/icons/cards/mastercard.svg";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";


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

const StyledPaymentCardIcon = styled.img`
  width: 44px;
  height: 26px;
`;

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentMethod = (props) => {
  const { editMode, onEdit } = props;

  const { state } = useContext(AppContext);
  const { subscriptionPaymentMethod, isSubscriptionPaymentMethodLoading } = state;

  const onOpenForm = () => onEdit && onEdit();

  let cardIcon;
  let innerCardType;

  switch (subscriptionPaymentMethod?.paymentSystem) {
  case "mastercard":
    cardIcon = mastercardIcon;
    break;
  case "visa":
    cardIcon = visaIcon;
    break;
  }

  switch (subscriptionPaymentMethod?.cardType) {
  case "credit_card":
    innerCardType = "Credit card";
    break;
  }

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

      {isSubscriptionPaymentMethodLoading ? (
        <StyledSpinner>
          <LoadingSpinner />
        </StyledSpinner>
      ) : (
        <StyledPaymentContent>
          { innerCardType } - 
          <StyledPaymentCardIcon src={cardIcon} />
        ending in { subscriptionPaymentMethod?.lastFourNumbers } - Expires { subscriptionPaymentMethod?.expiration.date }
        </StyledPaymentContent>
      )}

    </div>
  );
};

PaymentMethod.propTypes = PaymentMethodPropTypes;
PaymentMethod.defaultProps = PaymentMethodDefaultProps;

export default PaymentMethod;

import { useContext } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import { SubscriptionPaymentType, SubscriptionPaymentSystem } from "../const";
import AppContext from "../contexts/AppContext";
import TitleWithEditButton from "./ui/TitleWithEditButton";
import mastercardIcon from "../assets/icons/cards/mastercard.svg";
import visaIcon from "../assets/icons/cards/visa.svg";

const StyledTitle = styled.div`
  margin-bottom: 8px;
`;

const StyledPaymentContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  font-size: 14px;
  line-height: 20px;
`;

const StyledPaymentCardIcon = styled.img`
  width: 44px;
  height: 26px;
  margin-right: 4px;
  margin-left: 4px;
`;

const PaymentMethod = () => {
  const { appState, appActions } = useContext(AppContext);

  const {
    paymentMethod,
    isAppLoading,
    isPaymentMethodLoading,
    showPaymentMethodForm,
    isSubscriptionActive
  } = appState;

  const { startUpdatePaymentMethod } = appActions;

  const showEditButton = !isPaymentMethodLoading && isSubscriptionActive && !showPaymentMethodForm;

  const handleEditButtonClick = () => startUpdatePaymentMethod();

  let cardIcon;
  let innerCardType;

  switch (paymentMethod?.system) {
  case SubscriptionPaymentSystem.MASTERCARD:
    cardIcon = mastercardIcon;
    break;
  case SubscriptionPaymentSystem.VISA:
    cardIcon = visaIcon;
    break;
  }

  switch (paymentMethod?.type) {
  case SubscriptionPaymentType.CREDIT_CARD:
    innerCardType = "Credit card";
    break;
  }

  return (
    <div>

      <StyledTitle>
        <TitleWithEditButton
          title="Payment method"
          editButtonLabel="Change payment method"
          showEditButton={showEditButton}
          editButtonDisabled={isAppLoading}
          onEditButtonClick={handleEditButtonClick}
        />
      </StyledTitle>

      {isPaymentMethodLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledPaymentContent>
          { innerCardType } -
          <StyledPaymentCardIcon src={cardIcon} />
          ending in { paymentMethod?.lastFourDigits } - Expires { paymentMethod?.expiration.date }
        </StyledPaymentContent>
      )}

    </div>
  );
};

export default PaymentMethod;

import { useContext } from "react";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./ui/TitleWithEditButton";
import visaIcon from "../assets/icons/cards/visa.svg";
import mastercardIcon from "../assets/icons/cards/mastercard.svg";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import { SubscriptionStatus } from "../const";

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

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentMethod = () => {
  const { state, actions } = useContext(AppContext);

  const {
    subscription,
    paymentMethod,
    isAppLoading,
    isPaymentMethodLoading,
    showPaymentMethodForm
  } = state;

  const { startUpdatePaymentMethod } = actions;

  const isSubscriptionActive = subscription?.status === SubscriptionStatus.ACTIVE;
  const showEditButton = isSubscriptionActive && !showPaymentMethodForm;

  const handleEditButtonClick = () => startUpdatePaymentMethod();

  let cardIcon;
  let innerCardType;

  switch (paymentMethod?.system) {
  case "mastercard":
    cardIcon = mastercardIcon;
    break;
  case "visa":
    cardIcon = visaIcon;
    break;
  }

  switch (paymentMethod?.type) {
  case "credit_card":
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
        <StyledSpinner>
          <LoadingSpinner />
        </StyledSpinner>
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

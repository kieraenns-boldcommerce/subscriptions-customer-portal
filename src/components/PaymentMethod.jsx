import { useContext } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import { SubscriptionPaymentType, SubscriptionPaymentSystem } from "../const";
import { AppStateContext } from "../AppState";
import TitleWithEditButton from "./ui/TitleWithEditButton";
import mastercardIcon from "../assets/icons/mastercard.svg";
import visaIcon from "../assets/icons/visa.svg";

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
  const { appState, appActions } = useContext(AppStateContext);

  const {
    paymentMethod,
    isAppLoading,
    isPaymentMethodLoading,
    isSubscriptionActive,
    showPaymentMethodForm
  } = appState;

  const {
    startUpdatePaymentMethod
  } = appActions;

  const type = paymentMethod?.type;
  const system = paymentMethod?.system;
  const lastFourDigits = paymentMethod?.lastFourDigits;
  const expirationDate = paymentMethod?.expiration.date;

  let formattedType;
  let systemIcon;

  switch (type) {
  case SubscriptionPaymentType.CREDIT_CARD:
    formattedType = "Credit card";
    break;
  }

  switch (system) {
  case SubscriptionPaymentSystem.MASTERCARD:
    systemIcon = mastercardIcon;
    break;
  case SubscriptionPaymentSystem.VISA:
    systemIcon = visaIcon;
    break;
  }

  const showEditButton = !isPaymentMethodLoading && isSubscriptionActive && !showPaymentMethodForm;

  const handleEditButtonClick = () => startUpdatePaymentMethod();

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
          { formattedType } -
          <StyledPaymentCardIcon src={systemIcon} />
          ending in { lastFourDigits } - Expires { expirationDate }
        </StyledPaymentContent>
      )}

    </div>
  );
};

export default PaymentMethod;

import { useContext } from "react";
import PT from "prop-types";
import styled from "styled-components";
import { SubscriptionAddress, SubscriptionStatus } from "../const";
import TitleWithEditButton from "./ui/TitleWithEditButton";
import AppContext from "../contexts/AppContext";

const AddressTypeType = PT.oneOf([
  SubscriptionAddress.SHIPPING,
  SubscriptionAddress.BILLING
]);

const AddressPropTypes = {
  type: AddressTypeType.isRequired
};

const StyledAddress = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--color-text-default);

  @media (min-width: 576px) {
    line-height: 18px;
  }
`;

const StyledTitle = styled.div`
  margin-bottom: 9px;
`;

const StyledFullName = styled.div`
  font-weight: 700;
`;

const Address = (props) => {
  const { type } = props;

  const { state: appState, actions } = useContext(AppContext);

  const {
    subscription,
    isAppLoading,
    showShippingAddressForm,
    showBillingAddressForm
  } = appState;

  const { startUpdateAddressShipping, startUpdateAddressBilling } = actions;

  if (!subscription) return null;

  const isShipping = type === SubscriptionAddress.SHIPPING;
  const title = isShipping ? "Shipping address" : "Billing address";
  const editButtonLabel = isShipping ? "Edit shipping address" : "Edit billing address";
  const isSubscriptionActive = subscription.status === SubscriptionStatus.ACTIVE;
  const showForm = isShipping ? showShippingAddressForm : showBillingAddressForm;
  const showEditButton = isSubscriptionActive && !showForm;
  const address = isShipping ? subscription.shippingAddress : subscription.billingAddress;

  const {
    firstName,
    lastName,
    lineFirst,
    lineSecond,
    city,
    state,
    zip,
    country,
    company,
    phone
  } = address;

  const handleEditButtonClick = () => {
    if (isShipping) startUpdateAddressShipping();
    else startUpdateAddressBilling();
  };

  return (
    <StyledAddress>

      <StyledTitle>
        <TitleWithEditButton
          title={title}
          editButtonLabel={editButtonLabel}
          showEditButton={showEditButton}
          editButtonDisabled={isAppLoading}
          onEditButtonClick={handleEditButtonClick}
        />
      </StyledTitle>

      <StyledFullName>
        { firstName } { lastName }
      </StyledFullName>

      { lineFirst }<br />
      { lineSecond && <>{ lineSecond }<br /></> }
      { city }, { state }, { zip }<br />
      { country }<br />
      { company && <>Company: { company }<br /></> }
      { phone && <>Phone: { phone }</>}

    </StyledAddress>
  );
};

Address.propTypes = AddressPropTypes;

export default Address;

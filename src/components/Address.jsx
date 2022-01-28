import { useEffect, useState, useContext } from "react";
import PT from "prop-types";
import styled from "styled-components";
import TitleWithEditButton from "./TitleWithEditButton";
import AppContext from "../contexts/AppContext";
import { INITIAL_ADDRESS_STATE } from "../constants";

const AddressPropTypes = {
  type: PT.oneOf(["shipping", "billing"]).isRequired,
  showEditButton: PT.bool,
  altTextEditButton: PT.string,
  onEdit: PT.func
};

const AddressDefaultProps = {
  showEditButton: false
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
  const {
    type,
    showEditButton,
    altTextEditButton,
    onEdit
  } = props;

  const title = type === "shipping" ? "Shipping address" : "Billing address";

  const { state, methods } = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const { activeSubscription, activeSubscriptionId } = state;
  const { setActiveAddressData } = methods;

  const [innerAddressData, setInnerAddressData] = useState(INITIAL_ADDRESS_STATE);

  const onEditAddressFormButtonClick = () => {
    setActiveAddressData({ ...innerAddressData, type });
    onEdit();
  };

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (!activeSubscription) return;

    const { billingAddress, shippingAddress } = activeSubscription;

    console.log(billingAddress);
    console.log(shippingAddress);

    type === "shipping" ? setInnerAddressData(shippingAddress) : setInnerAddressData(billingAddress);
  }, [activeSubscription]);


  if (!innerAddressData) return null;

  const {
    city,
    companyName,
    country,
    firstName,
    lastName,
    phoneNumber,
    stateOrProvince,
    addressLineFirst,
    addressLineSecond,
    zipOrPostalCode
  } = innerAddressData;

  return (
    <StyledAddress>

      <StyledTitle>
        <TitleWithEditButton
          title={title}
          showEditButton={showEditButton}
          altTextButton={altTextEditButton}
          onEdit={onEditAddressFormButtonClick}
        />
      </StyledTitle>

      <StyledFullName>
        { firstName } { lastName }
      </StyledFullName>

      { addressLineFirst }<br />
      { addressLineSecond && <>{ addressLineSecond }<br /></> }
      { city }, { stateOrProvince }, { zipOrPostalCode }<br />
      { country }<br />
      { companyName && <>Company: { companyName }<br /></> }
      { phoneNumber && <>Phone: { phoneNumber }</>}

    </StyledAddress>
  );
};

Address.propTypes = AddressPropTypes;
Address.defaultProps = AddressDefaultProps;

export default Address;

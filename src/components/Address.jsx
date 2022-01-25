import PT from "prop-types";
import styled from "styled-components";
import TitleWithEditButton from "./TitleWithEditButton";

const AddressPropTypes = {
  type: PT.oneOf(["shipping", "billing"]).isRequired,
  firstName: PT.string.isRequired,
  lastName: PT.string.isRequired,
  addressLineFirst: PT.string.isRequired,
  addressLineSecond: PT.string,
  city: PT.string.isRequired,
  stateOrProvince: PT.string.isRequired,
  zipOrPostalCode: PT.string.isRequired,
  country: PT.string.isRequired,
  phoneNumber: PT.string.isRequired,
  companyName: PT.string,
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
    firstName,
    lastName,
    addressLineFirst,
    addressLineSecond,
    city,
    stateOrProvince,
    zipOrPostalCode,
    country,
    phoneNumber,
    companyName,
    showEditButton,
    altTextEditButton,
    onEdit
  } = props;

  const title = type === "shipping" ? "Shipping address" : "Billing address";

  return (
    <StyledAddress>

      <StyledTitle>
        <TitleWithEditButton
          title={title}
          showEditButton={showEditButton}
          altTextButton={altTextEditButton}
          onEdit={onEdit}
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
      Phone: { phoneNumber }

    </StyledAddress>
  );
};

Address.propTypes = AddressPropTypes;
Address.defaultProps = AddressDefaultProps;

export default Address;

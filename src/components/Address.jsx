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
  onEdit: PT.func
};

const AddressDefaultProps = {
  showEditButton: false
};

const StyledAddress = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-text-default);
`;

const StyledTitle = styled.div`
  margin-bottom: 4px;
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
    onEdit
  } = props;

  const title = type === "shipping" ? "Shipping address" : "Billing address";

  return (
    <StyledAddress>

      <StyledTitle>
        <TitleWithEditButton
          title={title}
          showEditButton={showEditButton}
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

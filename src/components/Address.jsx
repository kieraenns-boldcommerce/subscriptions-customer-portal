import PT from "prop-types";
import styled from "styled-components";
import TitleWithEditButton from "./TitleWithEditButton";

const AddressPropTypes = {
  type: PT.oneOf(["shipping", "billing"]).isRequired,
  data: PT.shape({
    city: PT.string.isRequired,
    company: PT.string,
    country: PT.string.isRequired,
    firstName: PT.string.isRequired,
    lastName: PT.string.isRequired,
    phone: PT.string,
    state: PT.string.isRequired,
    lineFirst: PT.string.isRequired,
    lineSecond: PT.string,
    zip: PT.string.isRequired
  }),
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
    data,
    showEditButton,
    altTextEditButton,
    onEdit
  } = props;

  const title = type === "shipping" ? "Shipping address" : "Billing address";

  if (!data) return null;

  const {
    city,
    company,
    country,
    firstName,
    lastName,
    phone,
    state,
    lineFirst,
    lineSecond,
    zip
  } = data;

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
Address.defaultProps = AddressDefaultProps;

export default Address;

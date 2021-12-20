import { VFC } from "react";
import styled from "styled-components";
import TitleWithEditButton from "@/components/TitleWithEditButton";

type AddressType = "shipping" | "billing"

interface IAddress {
  type: AddressType
  firstName: string
  lastName: string
  addressLineFirst: string
  addressLineSecond?: string
  city: string
  stateOrProvince: string
  zipOrPostalCode: string
  country: string
  phoneNumber: string
  companyName?: string
  showEditButton?: boolean
  onEdit?: () => void
}

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

const Address: VFC<IAddress> = (props) => {
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

export default Address;

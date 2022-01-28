import { useContext, useState } from "react";
import PT from "prop-types";
import styled from "styled-components";
import { Button, InputField, SelectField } from "@boldcommerce/stacks-ui";
import Section from "./Section";
import FormLayout from "./FormLayout";
import FieldsLayout from "./FieldsLayout";
import AppContext from "../contexts/AppContext";
import { STATE_OPTIONS, CITY_OPTIONS, COUNTRY_OPTIONS } from "../constants";

const AddressFormPropTypes = {
  onConfirm: PT.func,
  onCancel: PT.func
};


const StyledAddressForm = styled.div`
  padding-bottom: 30px;
`;

const StyledButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: end;
  column-gap: 16px;
`;

const StyledAddressFormSecondRow = styled.div`
  width: 48%;

  @media (min-width: 576px) {
    width: 100%;
  }
`;

const AddressForm = (props) => {
  const { onConfirm, onCancel } = props;

  const { state, methods } = useContext(AppContext);
  const {
    activeAddressData,
    activeShopId
  } = state;
  const {
    setActiveAddressData,
    formatAddressDataForServer,
    changeAddress
  } = methods;

  const [addressDataForm, setAddressDataForm] = useState(activeAddressData);

  const {
    type,
    id,
    customerId,
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
  } = addressDataForm;

  const title = type === "shipping"
    ? "Editing shipping address"
    : "Editing billing address";

  const onConfirmAddressButtonClick = () => {
    setActiveAddressData(addressDataForm);

    changeAddress({
      shopIdentifier: activeShopId,
      customerId,
      addressId: id,
      data: {
        customer_address: {
          ...formatAddressDataForServer(addressDataForm)
        }
      }
    });

    onConfirm && onConfirm();
  };

  return (
    <Section title={title}>
      <StyledAddressForm>
        <FormLayout>

          <FieldsLayout>
            <InputField
              value={firstName}
              label="First name"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                firstName: event.target.value
              }))}
            />
            <InputField
              value={lastName}
              label="Last name"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                lastName: event.target.value
              }))}
            />
            <InputField
              value={addressLineFirst}
              label="Address line 1"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                addressLineFirst: event.target.value
              }))}
            />
            <InputField
              value={addressLineSecond}
              label="Address line 2"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                addressLineSecond: event.target.value
              }))}
            />
          </FieldsLayout>

          <StyledAddressFormSecondRow>
            <FieldsLayout>
              <SelectField
                options={CITY_OPTIONS}
                value={city}
                label="City"
                onChange={(event) => {
                  setAddressDataForm((prev) => ({
                    ...prev,
                    city: event.target.value
                  }));
                }}
              />
              <SelectField
                options={STATE_OPTIONS}
                value={stateOrProvince}
                label="State/Province"
                onChange={(event) => setAddressDataForm((prev) => ({
                  ...prev,
                  stateOrProvince: event.target.value
                }))}
              />
              <SelectField
                options={COUNTRY_OPTIONS}
                value={country}
                label="Country"
                onChange={(event) => setAddressDataForm((prev) => ({
                  ...prev,
                  country: event.target.value
                }))}
              />
            </FieldsLayout>
          </StyledAddressFormSecondRow>

          <FieldsLayout>
            <InputField
              value={zipOrPostalCode}
              label="Zip/Postal code"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                zipOrPostalCode: event.target.value
              }))}
            />
            <InputField
              value={phoneNumber}
              label="Phone number"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                phoneNumber: event.target.value
              }))}
            />
            <InputField
              value={companyName}
              label="Company name (optional)"
              onInput={(event) => setAddressDataForm((prev) => ({
                ...prev,
                companyName: event.target.value
              }))}
            />
          </FieldsLayout>

          <StyledButtonsWrapper>
            <Button className="button-AddressForm" onClick={onCancel}>
              Discard changes
            </Button>
            <Button className="button-AddressForm" primary onClick={onConfirmAddressButtonClick}>
              Save changes
            </Button>
          </StyledButtonsWrapper>

        </FormLayout>
      </StyledAddressForm>
    </Section>
  );
};

AddressForm.propTypes = AddressFormPropTypes;

export default AddressForm;

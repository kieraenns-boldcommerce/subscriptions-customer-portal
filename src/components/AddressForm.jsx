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
  type: PT.oneOf(["shipping", "billing"]).isRequired,
  data: PT.shape({
    id: PT.number.isRequired,
    customerId: PT.number.isRequired,
    city: PT.string.isRequired,
    company: PT.string.isRequired,
    country: PT.string.isRequired,
    firstName: PT.string.isRequired,
    lastName: PT.string.isRequired,
    phone: PT.string.isRequired,
    province: PT.string.isRequired,
    addressLineFirst: PT.string.isRequired,
    addressLineSecond: PT.string.isRequired,
    zip: PT.string.isRequired
  }).isRequired,
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
  const { type, data, onConfirm, onCancel } = props;

  const { state, methods } = useContext(AppContext);
  const { shopId } = state;
  const { changeAddress } = methods;

  const [addressDataForm, setAddressDataForm] = useState(data);

  const {
    id,
    customerId,
    city,
    company,
    country,
    firstName,
    lastName,
    phone,
    province,
    addressLineFirst,
    addressLineSecond,
    zip
  } = addressDataForm;

  const title = type === "shipping"
    ? "Editing shipping address"
    : "Editing billing address";

  const onConfirmAddressButtonClick = () => {
    changeAddress({
      shopIdentifier: shopId,
      customerId,
      addressId: id,
      data: addressDataForm
    });

    onConfirm && onConfirm();
  };

  const onFormFieldChange = (event, key) => setAddressDataForm((prev) => ({
    ...prev,
    [key]: event.target.value
  }));

  return (
    <Section title={title}>
      <StyledAddressForm>
        <FormLayout>

          <FieldsLayout>
            <InputField
              value={firstName}
              label="First name"
              onInput={(event) => onFormFieldChange(event, "firstName")}
            />
            <InputField
              value={lastName}
              label="Last name"
              onInput={(event) => onFormFieldChange(event, "lastName")}
            />
            <InputField
              value={addressLineFirst}
              label="Address line 1"
              onInput={(event) => onFormFieldChange(event, "addressLineFirst")}
            />
            <InputField
              value={addressLineSecond}
              label="Address line 2"
              onInput={(event) => onFormFieldChange(event, "addressLineSecond")}
            />
          </FieldsLayout>

          <StyledAddressFormSecondRow>
            <FieldsLayout>
              <SelectField
                options={CITY_OPTIONS}
                value={city}
                label="City"
                onChange={(event) => onFormFieldChange(event, "city")}
              />
              <SelectField
                options={STATE_OPTIONS}
                value={province}
                label="State/Province"
                onChange={(event) => onFormFieldChange(event, "province")}
              />
              <SelectField
                options={COUNTRY_OPTIONS}
                value={country}
                label="Country"
                onChange={(event) => onFormFieldChange(event, "country")}
              />
            </FieldsLayout>
          </StyledAddressFormSecondRow>

          <FieldsLayout>
            <InputField
              value={zip}
              label="Zip/Postal code"
              onInput={(event) => onFormFieldChange(event, "zip")}
            />
            <InputField
              value={phone}
              label="Phone number"
              onInput={(event) => onFormFieldChange(event, "phone")}
            />
            <InputField
              value={company}
              label="Company name (optional)"
              onInput={(event) => onFormFieldChange(event, "company")}
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

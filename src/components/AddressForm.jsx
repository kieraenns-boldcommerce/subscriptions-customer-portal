import { useContext, useState } from "react";
import PT from "prop-types";
import styled from "styled-components";
import { Button, InputField, SelectField } from "@boldcommerce/stacks-ui";
import Section from "./Section";
import FormLayout from "./FormLayout";
import FieldsLayout from "./FieldsLayout";
import AppContext from "../contexts/AppContext";
import { SubscriptionAddress } from "../const";
import getCountries from "../utils/getCountries";
import getStatesOfCountry from "../utils/getStatesOfCountry";
import getCitiesOfState from "../utils/getCitiesOfState";
import getCitiesOfCountry from "../utils/getCitiesOfCountry";
import formatCountryOption from "../utils/formatCountryOption";
import formatStateOption from "../utils/formatStateOption";
import formatCityOption from "../utils/formatCityOption";

const AddressFormTypeType = PT.oneOf([
  SubscriptionAddress.SHIPPING,
  SubscriptionAddress.BILLING
]);

const AddressFormPropTypes = {
  type: AddressFormTypeType.isRequired
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
  const { type } = props;

  const { state, actions } = useContext(AppContext);
  const { subscription, addressFormErrors, isAppLoading } = state;

  const {
    stopUpdateAddressShipping,
    finishUpdateAddressShipping,
    stopUpdateAddressBilling,
    finishUpdateAddressBilling
  } = actions;

  const isShipping = type === SubscriptionAddress.SHIPPING;
  const address = isShipping ? subscription.shippingAddress : subscription.billingAddress;
  const title = isShipping ? "Editing shipping address" : "Editing billing address";

  const [form, setForm] = useState(address);

  const {
    company,
    countryCode,
    stateCode,
    city,
    firstName,
    lastName,
    phone,
    lineFirst,
    lineSecond,
    zip
  } = form;

  const countries = getCountries();
  const states = getStatesOfCountry(countryCode);
  const citiesOfState = getCitiesOfState(countryCode, stateCode);
  const citiesOfCountry = getCitiesOfCountry(countryCode);

  const cities = countryCode && states.length === 0
    ? citiesOfCountry
    : citiesOfState;

  const countryOptions = countries.map(formatCountryOption);
  const stateOptions = states.map(formatStateOption);
  const cityOptions = cities.map(formatCityOption);

  const isStateFieldDisabled = isAppLoading || stateOptions.length === 0;
  const isCityFieldDisabled = isAppLoading || cityOptions.length === 0;

  const onFormFieldChange = (event, key) => setForm((prev) => ({
    ...prev,
    [key]: event.target.value
  }));

  const onCountryChange = (event) => {
    const { value: countryCode } = event.target;

    const {
      name: country
    } = countryOptions.find((countryOption) => countryOption.value === countryCode);

    setForm((prev) => ({
      ...prev,
      country,
      countryCode,
      state: "",
      stateCode: "",
      city: ""
    }));
  };

  const onStateChange = (event) => {
    const { value: stateCode } = event.target;

    const {
      name: state
    } = stateOptions.find((stateOption) => stateOption.value === stateCode);

    setForm((prev) => ({
      ...prev,
      state,
      stateCode,
      city: ""
    }));
  };

  const handleConfirmButtonClick = () => {
    if (isShipping) finishUpdateAddressShipping(form);
    else finishUpdateAddressBilling(form);
  };

  const handleCancelButtonClick = () => {
    if (isShipping) stopUpdateAddressShipping();
    else stopUpdateAddressBilling();
  };

  return (
    <Section title={title}>
      <StyledAddressForm>
        <FormLayout>

          <FieldsLayout>
            <InputField
              value={firstName}
              label="First name"
              placeholder="Enter first name"
              messageType={addressFormErrors?.firstName && "alert"}
              messageText={addressFormErrors?.firstName}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "firstName")}
            />
            <InputField
              value={lastName}
              label="Last name"
              placeholder="Enter last name"
              messageType={addressFormErrors?.lastName && "alert"}
              messageText={addressFormErrors?.lastName}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "lastName")}
            />
            <InputField
              value={lineFirst}
              label="Address line 1"
              placeholder="Enter address line 1"
              messageType={addressFormErrors?.lineFirst && "alert"}
              messageText={addressFormErrors?.lineFirst}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "lineFirst")}
            />
            <InputField
              value={lineSecond}
              label="Address line 2"
              placeholder="Enter address line 2"
              messageType={addressFormErrors?.lineSecond && "alert"}
              messageText={addressFormErrors?.lineSecond}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "lineSecond")}
            />
          </FieldsLayout>

          <StyledAddressFormSecondRow>
            <FieldsLayout>
              <SelectField
                options={countryOptions}
                value={countryCode}
                label="Country"
                placeholder={countryCode ? "" : "Select country"}
                messageType={addressFormErrors?.country && "alert"}
                messageText={addressFormErrors?.country}
                disabled={isAppLoading}
                onChange={onCountryChange}
              />
              <SelectField
                options={stateOptions}
                value={stateCode}
                label="State/Province"
                placeholder={stateCode ? "" : "Select state/province"}
                messageType={addressFormErrors?.state && "alert"}
                messageText={addressFormErrors?.state}
                disabled={isStateFieldDisabled}
                onChange={onStateChange}
              />
              <SelectField
                options={cityOptions}
                value={city}
                label="City"
                placeholder={city ? "" : "Select city"}
                messageType={addressFormErrors?.city && "alert"}
                messageText={addressFormErrors?.city}
                disabled={isCityFieldDisabled}
                onChange={(event) => onFormFieldChange(event, "city")}
              />
            </FieldsLayout>
          </StyledAddressFormSecondRow>

          <FieldsLayout>
            <InputField
              value={zip}
              label="Zip/Postal code"
              placeholder="Enter zip/postal code"
              messageType={addressFormErrors?.zip && "alert"}
              messageText={addressFormErrors?.zip}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "zip")}
            />
            <InputField
              value={phone}
              label="Phone number"
              placeholder="Enter phone number"
              messageType={addressFormErrors?.phone && "alert"}
              messageText={addressFormErrors?.phone}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "phone")}
            />
            <InputField
              value={company}
              label="Company name (optional)"
              placeholder="Enter company name"
              messageType={addressFormErrors?.company && "alert"}
              messageText={addressFormErrors?.company}
              disabled={isAppLoading}
              onInput={(event) => onFormFieldChange(event, "company")}
            />
          </FieldsLayout>

          <StyledButtonsWrapper>
            <Button
              disabled={isAppLoading}
              onClick={handleCancelButtonClick}
            >
              Discard changes
            </Button>
            <Button
              primary
              disabled={isAppLoading}
              onClick={handleConfirmButtonClick}
            >
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

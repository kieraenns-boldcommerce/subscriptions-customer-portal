import PT from "prop-types";
import styled from "styled-components";
import { Button, InputField, SelectField } from "@boldcommerce/stacks-ui";
import Section from "./Section";
import FormLayout from "./FormLayout";
import FieldsLayout from "./FieldsLayout";

const AddressFormPropTypes = {
  type: PT.oneOf(["shipping", "billing"]).isRequired,
  onConfirm: PT.func,
  onCancel: PT.func
};


const STATE_OPTIONS = [
  { name: "Idaho", value: "idaho" },
  { name: "Alabama", value: "alabama" },
  { name: "Alaska", value: "alaska" },
  { name: "Arizona", value: "arizona" },
  { name: "Indiana", value: "indiana" },
  { name: "Virginia", value: "virginia" },
  { name: "Michigan", value: "michigan" }
];

const CITY_OPTIONS = [
  { name: "Houston", value: "houston" },
  { name: "Chicago", value: "chicago" },
  { name: "Los Angeles", value: "los-angeles" },
  { name: "New York", value: "new-york" },
  { name: "Dallas", value: "dallas" }
];

const COUNTRY_OPTIONS = [
  { name: "Russia", value: "russia" },
  { name: "USA", value: "usa" },
  { name: "China", value: "china" },
  { name: "India", value: "india" },
  { name: "Spain", value: "spain" },
  { name: "Japan", value: "japan" },
  { name: "Kazakhstan", value: "kazakhstan" }
];


const StyledAddressForm = styled.div`
  padding-bottom: 30px;
`;

const StyledButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: end;
  column-gap: 16px;
`;

const AddressForm = (props) => {
  const { type, onConfirm, onCancel } = props;

  const title = type === "shipping"
    ? "Editing shipping address"
    : "Editing billing address";

  return (
    <Section title={title}>
      <StyledAddressForm>
        <FormLayout>

          <FieldsLayout>
            <InputField label="First name" />
            <InputField label="Last name" />
            <InputField label="Address line 1" />
            <InputField label="Address line 2" />
          </FieldsLayout>

          <FieldsLayout>
            <SelectField options={CITY_OPTIONS} label="City" />
            <SelectField options={STATE_OPTIONS} label="State/Province" />
            <SelectField options={COUNTRY_OPTIONS} label="Country" />
          </FieldsLayout>

          <FieldsLayout>
            <InputField label="Zip/Postal code" />
            <InputField label="Phone number" />
            <InputField label="Company name (optional)" />
          </FieldsLayout>

          <StyledButtonsWrapper>
            <Button className="button-AddressForm" onClick={onCancel}>
              Discard changes
            </Button>
            <Button className="button-AddressForm" primary onClick={onConfirm}>
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

import PT from "prop-types";
import styled from "styled-components";
import { Button, InputField, SelectField } from "@boldcommerce/stacks-ui";
import Section from "./Section";
import FormLayout from "./FormLayout";
import FieldsLayout from "./FieldsLayout";

const AddressFormPropTypes = {
  type: PT.oneOf(["shipping", "billing"]).isRequired
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

const AddressForm = (props) => {
  const { type } = props;

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
            <SelectField label="Country" />
            <SelectField label="State/Province" />
            <SelectField label="City" />
          </FieldsLayout>

          <FieldsLayout>
            <InputField label="Zip/Postal code" />
            <InputField label="Phone number" />
            <InputField label="Company name (optional)" />
          </FieldsLayout>

          <StyledButtonsWrapper>
            <Button className="button-AddressForm">
              Discard changes
            </Button>
            <Button className="button-AddressForm" primary>
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

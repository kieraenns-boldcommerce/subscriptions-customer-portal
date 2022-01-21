import PT from "prop-types";
import { Button, SelectField } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import styled from "styled-components";
import { useEffect, useState } from "react";

const OptionPropTypes = {
  name: PT.string.isRequired,
  value: PT.string.isRequired
};

export const OrderFrequencyPropTypes = {
  options: PT.arrayOf(PT.shape(OptionPropTypes)).isRequired,
  onChange: PT.func.isRequired,
  editMode: PT.bool
};

const OrderFrequencyDefaultProps = {
  editMode: false
};


const StyledTitle = styled.div`
  margin-bottom: 12px;
`;

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 50% max-content;
  column-gap: 16px;

  .frequency-select,
  .stx-select,
  .button {
    margin: 0;
  }

  @media (min-width: 576px) {
    column-gap: 20px;
    grid-template-columns: 2fr 1fr;
  }
`;

const StyledDescription = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

const OrderFrequency = (props) => {
  const { options, editMode, onChange } = props;

  const [showForm, setShowForm] = useState(false);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeOptionValue, setActiveOptionValue] = useState(options[0].value);

  useEffect(() => {
    const matchOption = options.find((option) => option.value === activeOptionValue);
    setActiveOption(matchOption);
  }, [activeOptionValue]);

  const onSaveButtonClick = () => {
    onChange(activeOption);
    setShowForm(false);
  };

  const onChangeOption = (event) => setActiveOptionValue(event.target.value);

  const onOpenForm = () => setShowForm(true);
  

  return (
    <div>
      <StyledTitle>
        <TitleWithEditButton
          title="Order frequency"
          showEditButton={editMode}
        />
      </StyledTitle>

      {showForm ? (
        <StyledForm>
          <SelectField
            className="frequency-select"
            value={activeOptionValue}
            options={options}
            onChange={onChangeOption}
          />
          <Button 
            className="button"
            primary 
            onClick={onSaveButtonClick}
          >
            Save
          </Button>
        </StyledForm>
      ) : (
        <StyledDescription onClick={onOpenForm}>
          { activeOption.name }
        </StyledDescription>
      )}
    </div>
  );
};

OrderFrequency.propTypes = OrderFrequencyPropTypes;
OrderFrequency.defaultProps = OrderFrequencyDefaultProps;

export default OrderFrequency;

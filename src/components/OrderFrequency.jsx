import PT from "prop-types";
import { Button, SelectField } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import styled from "styled-components";
import { useEffect, useState } from "react";

const OptionsPropTypes = {
  name: PT.string.isRequired,
  value: PT.string.isRequired
};

export const OrderFrequencyPropTypes = {
  options: PT.arrayOf(PT.shape(OptionsPropTypes)).isRequired,
  onSave: PT.func.isRequired,
  showEditButton: PT.bool
};

const OrderFrequencyDefaultProps = {
  showEditButton: false
};


const StyledOrderFrequency = styled.div``;

const StyledTitle = styled.div`
  margin-bottom: 11px;
`;

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .frequency-select {
    margin: 0;
  }
`;

const StyledDescription = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

const OrderFrequency = (props) => {
  const { options, showEditButton, onSave } = props;

  const [showSelect, setShowSelect] = useState(false);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeOptionValue, setActiveOptionValue] = useState(options[0].value);

  useEffect(() => {
    const matchOption = options.find((option) => option.value === activeOptionValue);
    setActiveOption(matchOption);
  }, [activeOptionValue]);
  

  return (
    <StyledOrderFrequency>
      <StyledTitle>
        <TitleWithEditButton
          title="Order frequency"
          showEditButton={showEditButton}
        />
      </StyledTitle>

      {showSelect ? (
        <StyledSelect>
          <SelectField
            className="frequency-select"
            value={activeOptionValue}
            options={options}
            onChange={(e) => setActiveOptionValue(e.target.value)}
          />
          <Button primary onClick={() => {
            onSave(activeOption);
            setShowSelect(false);
          }}>
            Save
          </Button>
        </StyledSelect>
      ) : (
        <StyledDescription onClick={() => setShowSelect(true)}>
          { activeOption.name }
        </StyledDescription>
      )}
    </StyledOrderFrequency>
  );
};

OrderFrequency.propTypes = OrderFrequencyPropTypes;
OrderFrequency.defaultProps = OrderFrequencyDefaultProps;

export default OrderFrequency;

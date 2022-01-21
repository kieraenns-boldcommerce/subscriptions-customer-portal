import { useState } from "react";
import PT from "prop-types";
import { SelectField } from "@boldcommerce/stacks-ui";
import Menu from "./Menu";
import styled from "styled-components";


const OptionPropTypes = {
  name: PT.string.isRequired,
  value: PT.string.isRequired
};

const TopSectionPropTypes = {
  options: PT.arrayOf(PT.shape(OptionPropTypes)).isRequired,
  label: PT.string.isRequired,
  title: PT.string.isRequired,
  date: PT.string.isRequired,
  onChange: PT.func,
  onMenuItemClick: PT.func
};


const MENU_ITEMS = [
  { name: "Pause subscription", value: "pause" },
  { type: "alert", name: "Cancel subscription", value: "cancel" }
];


const StyledTopSection = styled.div`
  display: grid;
  row-gap: 32px;
`;

const StyledSelect = styled.div`
  .select {
    margin: 0;

    display: grid;
    row-gap: 4px;
  }

  @media (min-width: 576px) {
    .select {
      max-width: 326px;
    }
  }
`;

const StyledInfo = styled.div`
  display: grid;
  row-gap: 10px;
`;

const StyledInfoTop = styled.div`
  display: flex;
  align-items: center;

  > :not(:last-child) {
    margin-right: 30px;
  }
`;

const StyledTitle = styled.h2`
  margin: 0;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  @media (min-width: 576px) {
    line-height: 20px;
  }
`;

const StyledDate = styled.p`
  font-size: 14px;
  line-height: 20px;

  span {
    font-weight: 700;
  }
`;

const TopSection = (props) => {
  const { options, label, date, onChange, onMenuItemClick } = props;

  const [activeOption, setActiveOption] = useState(options[0]);

  const onOptionChange = (event) => {
    const { target } = event;

    const matchOption = options.find((option) => option.value === target.value);

    setActiveOption(matchOption);
    onChange(matchOption);
  };

  return (
    <StyledTopSection>
      <StyledSelect>
        <SelectField
          className="select"
          options={options}
          value={activeOption.value}
          label={label}
          onChange={onOptionChange}
        />
      </StyledSelect>

      <StyledInfo>
        <StyledInfoTop>
          <StyledTitle>
            { activeOption.name } Subscription — #{ activeOption.value }
          </StyledTitle>

          <Menu items={MENU_ITEMS} onItemClick={onMenuItemClick} />
        </StyledInfoTop>

        <StyledDate>
          <span>Next Order:</span> { date }
        </StyledDate>
      </StyledInfo>
    </StyledTopSection>
  );
};

TopSection.propTypes = TopSectionPropTypes;

export default TopSection;


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

const StyledSubscriptionInfo = styled.div`
  display: grid;
  row-gap: 10px;
`;

const StyledSubscriptionInfoTop = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: 30px;
  justify-content: start;
`;

const StyledSubscriptionName = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const StyledSubscriptionDate = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const StyledDateTitle = styled.span`
  font-weight: 700;
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
      <SelectField
        className="subscription-select-TopSection"
        options={options}
        value={activeOption.value}
        label={label}
        onChange={onOptionChange}
      />

      <StyledSubscriptionInfo>
        <StyledSubscriptionInfoTop>
          <StyledSubscriptionName>
            { activeOption.name } Subscription — #{ activeOption.value }
          </StyledSubscriptionName>

          <Menu items={MENU_ITEMS} onItemClick={onMenuItemClick} />
        </StyledSubscriptionInfoTop>

        <StyledSubscriptionDate>
          <StyledDateTitle>Next Order:</StyledDateTitle> { date }
        </StyledSubscriptionDate>
      </StyledSubscriptionInfo>
    </StyledTopSection>
  );
};

TopSection.propTypes = TopSectionPropTypes;

export default TopSection;


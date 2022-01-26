import { useState, useEffect } from "react";
import PT from "prop-types";
import { SelectField } from "@boldcommerce/stacks-ui";
import Menu from "./Menu";
import Message from "./Message";
import styled from "styled-components";


const OptionPropTypes = {
  name: PT.string.isRequired,
  value: PT.string.isRequired
};

const TopSectionPropTypes = {
  options: PT.arrayOf(PT.shape(OptionPropTypes)).isRequired,
  label: PT.string.isRequired,
  date: PT.string.isRequired,
  showMessage: PT.bool,
  onMessageButtonClick: PT.func,
  onSubscriptionChange: PT.func,
  onMenuItemChange: PT.func
};

const TopSectionDefaultProps = {
  showMessage: false
};


const MENU_ITEMS = [
  { name: "Pause subscription", value: "pause" },
  { type: "alert", name: "Cancel subscription", value: "cancel" }
];


const StyledTopSection = styled.div`
  display: grid;
  row-gap: 20px;

  @media (min-width: 576px) {
    row-gap: 26px;
  }
`;

const StyledSubscriptionInfo = styled.div`
  display: grid;
  row-gap: 10px;

  @media (min-width: 576px) {
    display: block;
  }
`;

const StyledSubscriptionInfoTop = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  justify-content: start;
  column-gap: 20px;
`;

const StyledSubscriptionName = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const StyledSubscriptionInfoBottom = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const StyledSubscriptionDate = styled.span`
  font-weight: 700;
`;

const StyledSubscriptionMessage = styled.div`
  margin-top: 14px;
`;

const TopSection = (props) => {
  const { options, label, date, showMessage, onMessageButtonClick, onSubscriptionChange, onMenuItemChange } = props;

  const [activeMenuItem, setActiveMenuItem] = useState(options[0]);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [messageData, setMessageData] = useState({});
  const { text, buttonText } = messageData;

  const onOptionChange = (event) => {
    const { target } = event;

    const matchOption = options.find((option) => option.value === target.value);

    setActiveOption(matchOption);
    onSubscriptionChange && onSubscriptionChange(matchOption);
  };

  const onMenuItemClick = (item) => {
    onMenuItemChange(item);
    setActiveMenuItem(item);
  };


  useEffect(() => {
    if (!activeMenuItem) return;

    const { value } = activeMenuItem;
    
    setMessageData({
      text: `This subscription has been ${value === "pause" ? "paused" : "canceled"}.`,
      buttonText: `${value === "pause" ? "Resume" : "Reactivate"} subscription`
    });
  }, [activeMenuItem]);


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

          <Menu items={MENU_ITEMS} onItemChange={onMenuItemClick} />
        </StyledSubscriptionInfoTop>

        {showMessage ? (
          <StyledSubscriptionInfoBottom>
            <StyledSubscriptionMessage>
              <Message
                text={text}
                buttonText={buttonText}
                onButtonClick={onMessageButtonClick}
              />
            </StyledSubscriptionMessage>
          </StyledSubscriptionInfoBottom>
        ) : (
          <StyledSubscriptionInfoBottom>
            <StyledSubscriptionDate>Next Order:</StyledSubscriptionDate> { date }
          </StyledSubscriptionInfoBottom>
        )}
      </StyledSubscriptionInfo>
    </StyledTopSection>
  );
};

TopSection.propTypes = TopSectionPropTypes;
TopSection.defaultProps = TopSectionDefaultProps;

export default TopSection;


import { useContext } from "react";
import PT from "prop-types";
import { SelectField } from "@boldcommerce/stacks-ui";
import Menu from "./Menu";
import Message from "./Message";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";


const TopSectionPropTypes = {
  label: PT.string.isRequired,
  showMessage: PT.bool,
  onMessageButtonClick: PT.func,
  onSubscriptionChange: PT.func,
  onMenuItemChange: PT.func
};

const TopSectionDefaultProps = {
  showMessage: false
};


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
  const {
    label,
    showMessage,
    onMessageButtonClick,
    onSubscriptionChange,
    onMenuItemChange
  } = props;

  const { state, methods } = useContext(AppContext);

  const {
    subscriptions,
    subscriptionOptions,
    messageData,
    activeSubscriptionOption
  } = state;
  const {
    setActiveSubscriptionId,
    setActiveSubscriptionOption
  } = methods;

  const showSubscriptionsSelect = subscriptionOptions.length > 1;

  const onOptionChange = (event) => {
    const { target } = event;

    const matchOption = subscriptionOptions && subscriptionOptions.find((option) => option.value === target.value);
    const matchSubscription = subscriptions && subscriptions.find((subscription) => String(subscription.id) === target.value);

    setActiveSubscriptionOption(matchOption);
    setActiveSubscriptionId(matchSubscription.id);

    onSubscriptionChange && onSubscriptionChange(matchOption);
  };

  const onMenuItemClick = (item) => onMenuItemChange(item);


  const MENU_ITEMS = [
    { name: `${showMessage ? "Resume" : "Pause"} subscription`, value: showMessage ? "resume" : "pause" },
    { type: "alert", name: "Cancel subscription", value: "inactive" }
  ];


  return (
    <StyledTopSection>
      {showSubscriptionsSelect && (
        <SelectField
          className="subscription-select-TopSection"
          options={subscriptionOptions}
          value={activeSubscriptionOption?.value}
          label={label}
          onChange={onOptionChange}
        />
      )}

      <StyledSubscriptionInfo>
        <StyledSubscriptionInfoTop>
          <StyledSubscriptionName>
            { activeSubscriptionOption?.title }
          </StyledSubscriptionName>

          <Menu items={MENU_ITEMS} onItemChange={onMenuItemClick} />
        </StyledSubscriptionInfoTop>

        {showMessage ? (
          <StyledSubscriptionInfoBottom>
            <StyledSubscriptionMessage>
              <Message
                text={messageData.text}
                buttonText={messageData.buttonText}
                onButtonClick={onMessageButtonClick}
              />
            </StyledSubscriptionMessage>
          </StyledSubscriptionInfoBottom>
        ) : (
          <StyledSubscriptionInfoBottom>
            <StyledSubscriptionDate>Next Order:</StyledSubscriptionDate> { activeSubscriptionOption?.date }
          </StyledSubscriptionInfoBottom>
        )}
      </StyledSubscriptionInfo>
    </StyledTopSection>
  );
};

TopSection.propTypes = TopSectionPropTypes;
TopSection.defaultProps = TopSectionDefaultProps;

export default TopSection;


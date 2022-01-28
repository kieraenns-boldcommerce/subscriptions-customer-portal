import { useState, useEffect, useContext } from "react";
import PT from "prop-types";
import { SelectField } from "@boldcommerce/stacks-ui";
import Menu from "./Menu";
import Message from "./Message";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import { INITIAL_SUBSCRIPTION_OPTION_STATE } from "../constants";


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
  const { subscriptions } = state;
  const { setActiveSubscription } = methods;

  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [activeSubscriptionOption, setActiveSubscriptionOption] = useState(INITIAL_SUBSCRIPTION_OPTION_STATE);
  const [activeMenuItem, setActiveMenuItem] = useState();
  const [messageData, setMessageData] = useState({
    text: "This subscription has been canceled.",
    buttonText: "Reactivate subscription"
  });

  const showSubscriptionsSelect = subscriptionOptions.length > 1;

  const { text, buttonText } = messageData;
  const { name, value, date } = activeSubscriptionOption;

  const onOptionChange = (event) => {
    const { target } = event;

    const matchOption = subscriptionOptions && subscriptionOptions.find((option) => option.value === target.value);
    const matchSubscription = subscriptions && subscriptions.find((subscription) => String(subscription.id) === target.value);

    setActiveSubscriptionOption(matchOption);
    setActiveSubscription(matchSubscription);

    onSubscriptionChange && onSubscriptionChange(matchOption);
  };

  const onMenuItemClick = (item) => {
    onMenuItemChange(item);
    setActiveMenuItem(item);
  };


  useEffect(() => {
    if (!subscriptions.length) return;


    const options = subscriptions.map((subscription) => {
      const { id, nextOrderDatetime } = subscription;

      const nextOrder = new Date(nextOrderDatetime).toLocaleString(
        "en-US",
        {
          month: "long",
          year: "numeric",
          day: "numeric"
        });

      return {
        name: "Name",
        value: String(id),
        date: nextOrder
      };
    });

    setSubscriptionOptions(options);
    setActiveSubscriptionOption(options[0]);
    setActiveSubscription(subscriptions[0]);
  }, [subscriptions]);
  

  useEffect(() => {
    if (!activeMenuItem) return;

    const { value } = activeMenuItem;
    
    setMessageData({
      text: `This subscription has been ${value === "pause" ? "paused" : "canceled"}.`,
      buttonText: `${value === "pause" ? "Resume" : "Reactivate"} subscription`
    });
  }, [activeMenuItem]);


  const MENU_ITEMS = [
    { name: `${showMessage ? "Resume" : "Pause"} subscription`, value: showMessage ? "resume" : "pause" },
    { type: "alert", name: "Cancel subscription", value: "cancel" }
  ];


  return (
    <StyledTopSection>
      {showSubscriptionsSelect && (
        <SelectField
          className="subscription-select-TopSection"
          options={subscriptionOptions}
          value={value}
          label={label}
          onChange={onOptionChange}
        />
      )}

      <StyledSubscriptionInfo>
        <StyledSubscriptionInfoTop>
          <StyledSubscriptionName>
            { name } Subscription — #{ value }
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


import { useContext } from "react";
import styled from "styled-components";
import { SelectField } from "@boldcommerce/stacks-ui";
import { SubscriptionAction, SubscriptionStatus } from "../const";
import formatSubscriptionOption from "../utils/formatSubscriptionOption";
import formatSubscriptionName from "../utils/formatSubscriptionName";
import formatSubscriptionNextOrderDatetime from "../utils/formatSubscriptionNextOrderDatetime";
import AppContext from "../contexts/AppContext";
import Menu from "./ui/Menu";
import Message from "./ui/Message";

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

const TopSection = () => {
  const { state, actions } = useContext(AppContext);

  const {
    subscriptions,
    subscription,
    subscriptionID,
    isAppLoading
  } = state;

  const {
    viewSubscription,
    startPauseSubscription,
    startCancelSubscription,
    activateSubscription
  } = actions;

  const subscriptionOptions = subscriptions.map(formatSubscriptionOption);

  const subscriptionName = formatSubscriptionName(subscription);
  const subscriptionNextOrderDatetime = formatSubscriptionNextOrderDatetime(subscription);

  const subscriptionStatus = subscription?.status;
  const isSubscriptionActive = subscriptionStatus === SubscriptionStatus.ACTIVE;
  const isSubscriptionInactive = subscriptionStatus === SubscriptionStatus.INACTIVE;
  const isSubscriptionPaused = subscriptionStatus === SubscriptionStatus.PAUSED;

  const showSubscriptionsSelect = subscriptions.length > 1;

  const handleSubscriptionChange = (event) => viewSubscription(Number(event.target.value));

  const menuItems = [
    { name: "Pause subscription", value: SubscriptionAction.PAUSE },
    { type: "alert", name: "Cancel subscription", value: SubscriptionAction.CANCEL }
  ];

  const handleMenuItemClick = (item) => {
    const action = item.value;
    if (action === SubscriptionAction.PAUSE) startPauseSubscription();
    if (action === SubscriptionAction.CANCEL) startCancelSubscription();
  };

  return (
    <StyledTopSection>
      {showSubscriptionsSelect && (
        <SelectField
          className="subscription-select-TopSection"
          options={subscriptionOptions}
          value={subscriptionID}
          label="Subscriptions"
          disabled={isAppLoading}
          onChange={handleSubscriptionChange}
        />
      )}

      <StyledSubscriptionInfo>
        <StyledSubscriptionInfoTop>
          <StyledSubscriptionName>
            { subscriptionName }
          </StyledSubscriptionName>

          {isSubscriptionActive && (
            <Menu
              items={menuItems}
              disabled={isAppLoading}
              onItemClick={handleMenuItemClick}
            />
          )}
        </StyledSubscriptionInfoTop>

        {isSubscriptionActive && (
          <StyledSubscriptionInfoBottom>
            <StyledSubscriptionDate>Next Order:</StyledSubscriptionDate>
            { subscriptionNextOrderDatetime }
          </StyledSubscriptionInfoBottom>
        )}

        {isSubscriptionInactive && (
          <StyledSubscriptionMessage>
            <Message
              text="This subscription has been canceled"
              buttonText="Reactivate subscription"
              buttonDisabled={isAppLoading}
              onButtonClick={activateSubscription}
            />
          </StyledSubscriptionMessage>
        )}

        {isSubscriptionPaused && (
          <StyledSubscriptionMessage>
            <Message
              text="This subscription has been paused"
              buttonText="Resume subscription"
              buttonDisabled={isAppLoading}
              onButtonClick={activateSubscription}
            />
          </StyledSubscriptionMessage>
        )}

      </StyledSubscriptionInfo>
    </StyledTopSection>
  );
};

export default TopSection;

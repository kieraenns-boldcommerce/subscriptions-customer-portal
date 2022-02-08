import PT from "prop-types";

export const SubscriptionAction = {
  PAUSE: "pause",
  CANCEL: "cancel",
  ACTIVATE: "activate"
};

export const SubscriptionStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PAUSED: "paused"
};

export const SubscriptionAddress = {
  SHIPPING: "shipping",
  BILLING: "billing"
};

export const SubscriptionPaymentType = {
  CREDIT_CARD: "credit_card"
};

export const SubscriptionPaymentSystem = {
  MASTERCARD: "mastercard",
  VISA: "visa"
};

export const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

export const ChildrenType = PT.oneOfType([
  ChildType,
  PT.arrayOf(ChildType)
]);

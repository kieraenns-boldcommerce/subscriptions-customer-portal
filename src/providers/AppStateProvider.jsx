import PT from "prop-types";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";

import useGetShop from "../hooks/queries/shops/useGetShop";
import useGetSubscriptions from "../hooks/queries/subscriptions/useGetSubscriptions";
import useGetIntervals from "../hooks/queries/subscriptions/useGetIntervals";
import useGetPaymentMethod from "../hooks/queries/subscriptions/useGetPaymentMethod";
import usePauseSubscription from "../hooks/queries/subscriptions/usePauseSubscription";
import useCancelSubscription from "../hooks/queries/subscriptions/useCancelSubscription";
import useActivateSubscription from "../hooks/queries/subscriptions/useActivateSubscription";
import useUpdateAddress from "../hooks/queries/subscriptions/useUpdateAddress";
import useUpdateInterval from "../hooks/queries/subscriptions/useUpdateInterval";

import { toast } from "react-toastify";
import Message from "../components/Message";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const AppStateProviderPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const AppStateProvider = (props) => {
  const { children } = props;

  // * States
  const [activeSubscriptionId, setActiveSubscriptionId] = useState(null);
  const [addressFormErrors, setAddressFormErrors] = useState(null);

  // * Handlers
  const onSuccessPauseSubscription = () => refetchSubscriptions();
  const onSuccessCancelSubscription = () => refetchSubscriptions();
  const onSuccessUpdateAddress = () => {
    refetchSubscriptions();
    toast(<Message text="Address changed successfully" type="success" />);
  };
  const onErrorUpdateAddress = (error) => {
    const { message, fieldErrors } = error;
    toast(<Message text={message} type="alert" />);
    setAddressFormErrors(fieldErrors);
  };
  const onSuccessActivateSubscription = () => {
    refetchSubscriptions();
    toast(<Message text="Subscription reactivated successfully" type="success" />);
  };
  const onSuccessUpdateInterval = () => {
    refetchSubscriptions();
    toast(<Message text="Frequency changed successfully" type="success" />);
  };

  // * Hooks
  const { shop, isShopLoading } = useGetShop();
  const shopID = shop?.shopID;

  const {
    subscriptions,
    areSubscriptionsLoading,
    refetchSubscriptions
  } = useGetSubscriptions({ shopID });

  const {
    intervals,
    // eslint-disable-next-line no-unused-vars
    areIntervalsLoading
  } = useGetIntervals({
    shopID,
    subscriptionID: activeSubscriptionId
  });

  const {
    paymentMethod,
    isPaymentMethodLoading
  } = useGetPaymentMethod({
    shopID,
    subscriptionID: activeSubscriptionId
  });

  const {
    isSubscriptionPausing,
    pauseSubscription
  } = usePauseSubscription({
    onSuccess: onSuccessPauseSubscription
  });

  const {
    isSubscriptionCancelling,
    cancelSubscription
  } = useCancelSubscription({
    onSuccess: onSuccessCancelSubscription
  });

  const {
    isSubscriptionActivating,
    activateSubscription
  } = useActivateSubscription({
    onSuccess: onSuccessActivateSubscription
  });

  const {
    isAddressUpdating,
    updateAddress
  } = useUpdateAddress({
    onSuccess: onSuccessUpdateAddress,
    onError: onErrorUpdateAddress
  });

  const {
    isIntervalUpdating,
    updateInterval
  } = useUpdateInterval({
    onSuccess: onSuccessUpdateInterval
  });

  useEffect(() => {
    if (!activeSubscriptionId && subscriptions?.length) setActiveSubscriptionId(subscriptions[0].id);
  }, [activeSubscriptionId, subscriptions]);

  const subscriptionOptions = subscriptions?.map((subscription) => {
    const { id, nextOrderDatetime, products } = subscription;

    const nextOrder = new Date(nextOrderDatetime).toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
        day: "numeric"
      });

    const optionName = products.length > 1 ? `${products.length} Product` : products[0].name;

    return {
      name: `${optionName} Subscription - ${String(id)}`,
      title: `${optionName} Subscription - #${String(id)}`,
      value: String(id),
      date: nextOrder
    };
  });

  const activeSubscription = subscriptions?.find((subscription) => subscription.id === activeSubscriptionId);
  const activeSubscriptionOption = subscriptionOptions?.find((option) => option.value === String(activeSubscriptionId));

  const isSubscriptionPaused = activeSubscription?.status === "paused";
  const messageProps = {
    text: `This subscription has been ${isSubscriptionPaused ? "paused" : "canceled"}.`,
    buttonText: `${isSubscriptionPaused ? "Resume" : "Reactivate"} subscription`
  };

  const isAppLoadingInitial = isShopLoading || areSubscriptionsLoading;

  const isAppLoading =
    areSubscriptionsLoading ||
    isSubscriptionPausing ||
    isSubscriptionCancelling ||
    isSubscriptionActivating ||
    isAddressUpdating ||
    isIntervalUpdating;

  const state = {
    state: {
      shopID,
      activeSubscription,
      activeSubscriptionOption,
      activeSubscriptionId,
      subscriptions,
      subscriptionOptions,
      intervals,
      addressFormErrors,
      messageProps,
      paymentMethod,
      isAppLoadingInitial,
      isAppLoading,
      isAddressUpdating,
      isIntervalUpdating,
      isPaymentMethodLoading
    },
    methods: {
      setActiveSubscriptionId,
      setAddressFormErrors,
      updateAddress,
      pauseSubscription,
      activateSubscription,
      cancelSubscription,
      updateInterval
    }
  };

  return (
    <AppContext.Provider value={state}>
      { children }
    </AppContext.Provider>
  );
};

AppStateProvider.propTypes = AppStateProviderPropTypes;

export default AppStateProvider;

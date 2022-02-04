import PT from "prop-types";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";

import useGetShop from "../hooks/queries/shops/useGetShop";

import { useGetSubscriptions } from "../hooks/queries/subscriptions/useGetSubscriptions";
import { useGetSubscriptionIntervals } from "../hooks/queries/subscriptions/useGetSubscriptionIntervals";
import { useChangeAddress } from "../hooks/queries/subscriptions/useChangeAddress";
import { usePauseSubscription } from "../hooks/queries/subscriptions/usePauseSubscription";
import { useReactivateSubscription } from "../hooks/queries/subscriptions/useReactivateSubscription";
import { useCancelSubscription } from "../hooks/queries/subscriptions/useCancelSubscription";
import { useChangeSubscriptionInterval } from "../hooks/queries/subscriptions/useChangeSubscriptionInterval";
import { useGetSubscriptionPaymentMethod } from "../hooks/queries/subscriptions/useGetSubscriptionPaymentMethod";
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
  const onSuccessChangeAddress = () => {
    refetchSubscriptions();
    toast(<Message text="Address changed successfully" type="success" />);
  };
  const onErrorChangeAddress = (error) => {
    const { message, fieldErrors } = error;
    toast(<Message text={message} type="alert" />);
    setAddressFormErrors(fieldErrors);
  };
  const onSuccessReactivateSubscription = () => {
    refetchSubscriptions();
    toast(<Message text="Subscription reactivated successfully" type="success" />);
  };
  const onSuccessChangeSubscriptionInterval = () => {
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
    subscriptionIntervals
  } = useGetSubscriptionIntervals({
    shopID,
    subscriptionID: activeSubscriptionId
  });

  const {
    subscriptionPaymentMethod,
    isSubscriptionPaymentMethodLoading
  } = useGetSubscriptionPaymentMethod({
    shopID,
    subscriptionID: activeSubscriptionId
  });

  const {
    pauseSubscription,
    isPauseSubscriptionLoading
  } = usePauseSubscription({
    onSuccess: onSuccessPauseSubscription
  });

  const {
    cancelSubscription,
    isCancelSubscriptionLoading
  } = useCancelSubscription({
    onSuccess: onSuccessCancelSubscription
  });

  const {
    reactivateSubscription,
    isReactivateSubscriptionLoading
  } = useReactivateSubscription({
    onSuccess: onSuccessReactivateSubscription
  });

  const {
    changeAddress,
    isChangeAddressLoading
  } = useChangeAddress({
    onSuccess: onSuccessChangeAddress,
    onError: onErrorChangeAddress
  });

  const {
    changeSubscriptionInterval,
    isChangeSubscriptionIntervalLoading
  } = useChangeSubscriptionInterval({
    onSuccess: onSuccessChangeSubscriptionInterval
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
    isPauseSubscriptionLoading ||
    isCancelSubscriptionLoading ||
    isReactivateSubscriptionLoading ||
    isChangeAddressLoading ||
    isChangeSubscriptionIntervalLoading;

  const state = {
    state: {
      shopID,
      activeSubscription,
      activeSubscriptionOption,
      activeSubscriptionId,
      subscriptions,
      subscriptionOptions,
      subscriptionIntervals,
      addressFormErrors,
      messageProps,
      subscriptionPaymentMethod,
      isAppLoadingInitial,
      isAppLoading,
      isChangeAddressLoading,
      isChangeSubscriptionIntervalLoading,
      isSubscriptionPaymentMethodLoading
    },
    methods: {
      setActiveSubscriptionId,
      setAddressFormErrors,
      changeAddress,
      pauseSubscription,
      reactivateSubscription,
      cancelSubscription,
      changeSubscriptionInterval
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

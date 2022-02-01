import PT from "prop-types";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { useGetShopInfo } from "../hooks/queries/shops/useGetShopInfo";
import { useGetSubscriptions } from "../hooks/queries/subscriptions/useGetSubscriptions";
import { useGetSubscriptionIntervals } from "../hooks/queries/subscriptions/useGetSubscriptionIntervals";
import { useChangeAddress } from "../hooks/queries/subscriptions/useChangeAddress";
import { usePauseSubscription } from "../hooks/queries/subscriptions/usePauseSubscription";
import { useReactivateSubscription } from "../hooks/queries/subscriptions/useReactivateSubscription";
import { useCancelSubscription } from "../hooks/queries/subscriptions/useCancelSubscription";
import { useChangeSubscriptionInterval } from "../hooks/queries/subscriptions/useChangeSubscriptionInterval";
import { useGetSubscriptionPaymentMethod } from "../hooks/queries/subscriptions/useGetSubscriptionPaymentMethod";


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
  const [toastValue, setToastValue] = useState(null);

  // * Handlers
  const onSuccessChangeAddress = () => {
    fetchSubscriptions();
    setToastValue({
      isShow: true,
      text: "Address changed successfully",
      type: "success"
    });
  };
  const onErrorChangeAddress = (error) => {
    setToastValue({
      isShow: true,
      text: error?.message,
      type: "alert"
    });
  };
  const onSuccessPauseSubscription = () => {
    fetchSubscriptions();
    setToastValue({
      isShow: true,
      text: "Subscription paused successfully",
      type: "success"
    });
  };
  const onSuccessReactivateSubscription = () => {
    fetchSubscriptions();
    setToastValue({
      isShow: true,
      text: "Subscription reactivate successfully",
      type: "success"
    });
  };
  const onSuccessCancelSubscription = () => {
    fetchSubscriptions();
    setToastValue({
      isShow: true,
      text: "Subscription closed successfully",
      type: "success"
    });
  };
  const onSuccessChangeSubscriptionInterval = () => {
    fetchSubscriptions();
    setToastValue({
      isShow: true,
      text: "Frequency changed successfully",
      type: "success"
    });
  };

  // * Hooks
  const { shop, isShopInfoLoading } = useGetShopInfo();
  const shopId = shop?.shopIdentifier;

  const {
    subscriptionsData,
    isSubscriptionsLoading,
    fetchSubscriptions
  } = useGetSubscriptions({
    shopIdentifier: shopId
  });
  const subscriptions = subscriptionsData?.subscriptions;

  const {
    subscriptionIntervals,
    fetchSubscriptionIntervals
  } = useGetSubscriptionIntervals({
    shopIdentifier: shopId,
    subscriptionId: activeSubscriptionId
  });

  const {
    subscriptionPaymentMethod,
    isSubscriptionPaymentMethodLoading
  } = useGetSubscriptionPaymentMethod({
    shopIdentifier: shopId,
    subscriptionId: activeSubscriptionId
  });

  const {
    changeAddress,
    isChangeAddressLoading
  } = useChangeAddress({
    onSuccess: onSuccessChangeAddress,
    onError: onErrorChangeAddress
  });

  const {
    pauseSubscription,
    isPauseSubscriptionLoading
  } = usePauseSubscription({
    onSuccess: onSuccessPauseSubscription
  });

  const {
    reactivateSubscription,
    isReactivateSubscriptionLoading
  } = useReactivateSubscription({
    onSuccess: onSuccessReactivateSubscription
  });

  const {
    cancelSubscription,
    isCancelSubscriptionLoading
  } = useCancelSubscription({
    onSuccess: onSuccessCancelSubscription
  });

  const {
    changeSubscriptionInterval,
    isChangeSubscriptionIntervalLoading
  } = useChangeSubscriptionInterval({
    onSuccess: onSuccessChangeSubscriptionInterval
  });

  useEffect(() => {
    if (!activeSubscriptionId && subscriptions) setActiveSubscriptionId(subscriptions[0].id);
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

  const isAppLoading = 
    isShopInfoLoading ||
    isSubscriptionsLoading ||
    isPauseSubscriptionLoading ||
    isReactivateSubscriptionLoading ||
    isCancelSubscriptionLoading;

  const state = {
    state: {
      shopId,
      activeSubscription,
      activeSubscriptionOption,
      activeSubscriptionId,
      subscriptions,
      subscriptionOptions,
      subscriptionIntervals,
      messageProps,
      subscriptionPaymentMethod,
      toastValue,
      isAppLoading,
      isChangeAddressLoading,
      isChangeSubscriptionIntervalLoading,
      isSubscriptionPaymentMethodLoading
    },
    methods: {
      setActiveSubscriptionId,
      fetchSubscriptionIntervals,
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

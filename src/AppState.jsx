import { createContext, useState, useEffect } from "react";
import { SubscriptionStatus, ChildrenType } from "./const";
import useGetSubscriptions from "./hooks/queries/subscriptions/useGetSubscriptions";
import useGetIntervals from "./hooks/queries/subscriptions/useGetIntervals";
import useGetPaymentMethod from "./hooks/queries/subscriptions/useGetPaymentMethod";
import usePauseSubscription from "./hooks/queries/subscriptions/usePauseSubscription";
import useCancelSubscription from "./hooks/queries/subscriptions/useCancelSubscription";
import useActivateSubscription from "./hooks/queries/subscriptions/useActivateSubscription";
import useUpdateAddress from "./hooks/queries/subscriptions/useUpdateAddress";
import useUpdateInterval from "./hooks/queries/subscriptions/useUpdateInterval";
import { Notify } from "./components/ui/Notification";

export const AppStateContext = createContext(null);

const AppStateProviderPropTypes = {
  children: ChildrenType.isRequired
};

export const AppStateProvider = (props) => {
  const { children } = props;

  // states
  const [subscriptionID, setSubscriptionID] = useState(null);

  const [addressFormErrors, setAddressFormErrors] = useState(null);

  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);
  const [showIntervalForm, setShowIntervalForm] = useState(false);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);

  const [showModalPause, setShowModalPause] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);

  // handlers for queries and mutations
  const handleGetSubscriptionsSuccess = () => {
    setShowShippingAddressForm(false);
    setShowBillingAddressForm(false);
    setShowIntervalForm(false);
    setShowPaymentMethodForm(false);

    setShowModalPause(false);
    setShowModalCancel(false);
  };

  const handlePauseSubscriptionSuccess = () => {
    refetchSubscriptions();
  };

  const handleCancelSubscriptionSuccess = () => {
    refetchSubscriptions();
  };

  const handleActivateSubscriptionSuccess = () => {
    Notify.success("Subscription reactivated successfully");
    refetchSubscriptions();
  };

  const handleUpdateAddressSuccess = () => {
    Notify.success("Address changed successfully");
    refetchSubscriptions();
  };

  const handleUpdateAddressError = (error) => {
    const { message, fieldErrors } = error;
    setAddressFormErrors(fieldErrors);
    Notify.alert(message);
  };

  const handleUpdateIntervalSuccess = () => {
    Notify.success("Frequency changed successfully");
    refetchSubscriptions();
  };

  // queries and mutations
  const {
    subscriptions,
    areSubscriptionsLoading,
    refetchSubscriptions
  } = useGetSubscriptions({
    onSuccess: handleGetSubscriptionsSuccess
  });

  const {
    intervals,
    areIntervalsLoading
  } = useGetIntervals({ subscriptionID });

  const {
    paymentMethod,
    isPaymentMethodLoading
  } = useGetPaymentMethod({ subscriptionID });

  const {
    isSubscriptionPausing,
    pauseSubscription
  } = usePauseSubscription({
    onSuccess: handlePauseSubscriptionSuccess
  });

  const {
    isSubscriptionCancelling,
    cancelSubscription
  } = useCancelSubscription({
    onSuccess: handleCancelSubscriptionSuccess
  });

  const {
    isSubscriptionActivating,
    activateSubscription
  } = useActivateSubscription({
    onSuccess: handleActivateSubscriptionSuccess
  });

  const {
    isAddressUpdating,
    updateAddress
  } = useUpdateAddress({
    onSuccess: handleUpdateAddressSuccess,
    onError: handleUpdateAddressError
  });

  const {
    isIntervalUpdating,
    updateInterval
  } = useUpdateInterval({
    onSuccess: handleUpdateIntervalSuccess
  });

  useEffect(() => {
    if (subscriptions?.length && !subscriptionID) {
      const { id } = subscriptions[0];
      setSubscriptionID(id);
    }
  }, [subscriptions, subscriptionID]);

  // derived data
  const isAppLoadingInitial = areSubscriptionsLoading;

  const isAppLoading =
    areSubscriptionsLoading ||
    isSubscriptionPausing ||
    isSubscriptionCancelling ||
    isSubscriptionActivating ||
    isAddressUpdating ||
    isIntervalUpdating;

  const subscription = subscriptions?.find((subscription) => {
    const { id } = subscription;
    return id === subscriptionID;
  });

  const subscriptionStatus = subscription?.status;
  const isSubscriptionActive = subscriptionStatus === SubscriptionStatus.ACTIVE;
  const isSubscriptionInactive = subscriptionStatus === SubscriptionStatus.INACTIVE;
  const isSubscriptionPaused = subscriptionStatus === SubscriptionStatus.PAUSED;

  // app state and actions
  const appState = {
    subscriptions,
    subscription,
    subscriptionID,

    intervals,
    paymentMethod,

    addressFormErrors,

    isAppLoadingInitial,
    isAppLoading,
    areIntervalsLoading,
    isPaymentMethodLoading,

    isSubscriptionActive,
    isSubscriptionInactive,
    isSubscriptionPaused,

    showShippingAddressForm,
    showBillingAddressForm,
    showIntervalForm,
    showPaymentMethodForm,
    showModalPause,
    showModalCancel
  };

  const appActions = {
    // active subscription
    viewSubscription: (subscriptionID) => {
      setSubscriptionID(subscriptionID);

      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
      setShowBillingAddressForm(false);
      setShowIntervalForm(false);
      setShowPaymentMethodForm(false);
    },

    // pause
    startPauseSubscription: () => {
      setShowModalPause(true);
    },
    stopPauseSubscription: () => {
      setShowModalPause(false);
    },
    finishPauseSubscription: () => {
      pauseSubscription({ subscriptionID });
    },

    // cancel
    startCancelSubscription: () => {
      setShowModalCancel(true);
    },
    stopCancelSubscription: () => {
      setShowModalCancel(false);
    },
    finishCancelSubscription: () => {
      cancelSubscription({ subscriptionID });
    },

    // activate
    activateSubscription: () => {
      activateSubscription({ subscriptionID });
    },

    // shipping address
    startUpdateAddressShipping: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(true);
      setShowBillingAddressForm(false);
      setShowIntervalForm(false);
      setShowPaymentMethodForm(false);
    },
    stopUpdateAddressShipping: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
    },
    finishUpdateAddressShipping: (address) => {
      updateAddress({ address });
    },

    // billing address
    startUpdateAddressBilling: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
      setShowBillingAddressForm(true);
      setShowIntervalForm(false);
      setShowPaymentMethodForm(false);
    },
    stopUpdateAddressBilling: () => {
      setAddressFormErrors(null);

      setShowBillingAddressForm(false);
    },
    finishUpdateAddressBilling: (address) => {
      updateAddress({ address });
    },

    // interval
    startUpdateInterval: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
      setShowBillingAddressForm(false);
      setShowIntervalForm(true);
      setShowPaymentMethodForm(false);
    },
    stopUpdateInterval: () => {
      setShowIntervalForm(false);
    },
    finishUpdateInterval: (intervalID) => {
      updateInterval({ subscriptionID, intervalID });
    },

    // payment
    startUpdatePaymentMethod: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
      setShowBillingAddressForm(false);
      setShowIntervalForm(false);
      setShowPaymentMethodForm(true);
    },
    stopUpdatePaymentMethod: () => {
      setShowPaymentMethodForm(false);
    },
    finishUpdatePaymentMethod: () => {
      updateInterval({ subscriptionID });
    }
  };

  const value = { appState, appActions };

  return (
    <AppStateContext.Provider value={value}>
      { children }
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = AppStateProviderPropTypes;

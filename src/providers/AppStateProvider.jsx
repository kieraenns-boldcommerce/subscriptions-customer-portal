import { useState, useEffect } from "react";

import { ChildrenType } from "../const";

import useGetShop from "../hooks/queries/shops/useGetShop";
import useGetSubscriptions from "../hooks/queries/subscriptions/useGetSubscriptions";
import useGetIntervals from "../hooks/queries/subscriptions/useGetIntervals";
import useGetPaymentMethod from "../hooks/queries/subscriptions/useGetPaymentMethod";
import usePauseSubscription from "../hooks/queries/subscriptions/usePauseSubscription";
import useCancelSubscription from "../hooks/queries/subscriptions/useCancelSubscription";
import useActivateSubscription from "../hooks/queries/subscriptions/useActivateSubscription";
import useUpdateAddress from "../hooks/queries/subscriptions/useUpdateAddress";
import useUpdateInterval from "../hooks/queries/subscriptions/useUpdateInterval";

import AppContext from "../contexts/AppContext";
import { Notify } from "../components/ui/Notification";

const AppStateProviderPropTypes = {
  children: ChildrenType.isRequired
};

const AppStateProvider = (props) => {
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
  const { shop, isShopLoading } = useGetShop();
  const shopID = shop?.shopID;

  const {
    subscriptions,
    areSubscriptionsLoading,
    refetchSubscriptions
  } = useGetSubscriptions({
    shopID,
    onSuccess: handleGetSubscriptionsSuccess
  });

  const {
    intervals,
    // eslint-disable-next-line no-unused-vars
    areIntervalsLoading
  } = useGetIntervals({ shopID, subscriptionID });

  const {
    paymentMethod,
    isPaymentMethodLoading
  } = useGetPaymentMethod({ shopID, subscriptionID });

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
    if (!subscriptionID && subscriptions?.length) setSubscriptionID(subscriptions[0].id);
  }, [subscriptionID, subscriptions]);

  const subscription = subscriptions?.find((subscription) => subscription.id === subscriptionID);

  const isAppLoadingInitial = isShopLoading || areSubscriptionsLoading;

  const isAppLoading =
    areSubscriptionsLoading ||
    isSubscriptionPausing ||
    isSubscriptionCancelling ||
    isSubscriptionActivating ||
    isAddressUpdating ||
    isIntervalUpdating;

  const actions = {
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
      pauseSubscription({ shopID, subscriptionID });
    },

    // cancel
    startCancelSubscription: () => {
      setShowModalCancel(true);
    },
    stopCancelSubscription: () => {
      setShowModalCancel(false);
    },
    finishCancelSubscription: () => {
      cancelSubscription({ shopID, subscriptionID });
    },

    // activate
    activateSubscription: () => activateSubscription({ shopID, subscriptionID }),

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
      updateAddress({ shopID, address });
    },

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
      updateAddress({ shopID, address });
    },

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
      updateInterval({ shopID, subscriptionID, intervalID });
    },

    startUpdatePaymentMethod: () => {
      setAddressFormErrors(null);

      setShowShippingAddressForm(false);
      setShowBillingAddressForm(false);
      setShowIntervalForm(false);
      setShowPaymentMethodForm(true);
    }
  };

  const state = {
    state: {
      subscription,
      subscriptionID,
      subscriptions,
      intervals,
      addressFormErrors,
      paymentMethod,
      isAppLoadingInitial,
      isAppLoading,
      isAddressUpdating,
      isIntervalUpdating,
      isPaymentMethodLoading,
      showModalPause,
      showModalCancel,
      showShippingAddressForm,
      showBillingAddressForm,
      showIntervalForm,
      showPaymentMethodForm
    },
    actions
  };

  return (
    <AppContext.Provider value={state}>
      { children }
    </AppContext.Provider>
  );
};

AppStateProvider.propTypes = AppStateProviderPropTypes;

export default AppStateProvider;

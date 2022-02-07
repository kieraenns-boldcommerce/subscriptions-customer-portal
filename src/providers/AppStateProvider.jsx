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
import Message from "../components/ui/Message";

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

  // States
  const [subscriptionID, setSubscriptionID] = useState(null);
  const [addressFormErrors, setAddressFormErrors] = useState(null);

  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);
  const [showIntervalForm, setShowIntervalForm] = useState(false);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);

  const [showModalPause, setShowModalPause] = useState(false);
  const [showModalDeactivate, setShowModalDeactivate] = useState(false);

  // Handlers
  const handleGetSubscriptionsSuccess = () => {
    setShowShippingAddressForm(false);
    setShowBillingAddressForm(false);
    setShowIntervalForm(false);
    setShowPaymentMethodForm(false);

    setShowModalPause(false);
    setShowModalDeactivate(false);
  };

  const handlePauseSubscriptionSuccess = () => {
    refetchSubscriptions();
  };

  const handleCancelSubscriptionSuccess = () => {
    refetchSubscriptions();
  };

  const handleActivateSubscriptionSuccess = () => {
    toast(<Message text="Subscription reactivated successfully" type="success" />);
    refetchSubscriptions();
  };

  const handleUpdateAddressSuccess = () => {
    toast(<Message text="Address changed successfully" type="success" />);
    refetchSubscriptions();
  };

  const handleUpdateAddressError = (error) => {
    const { message, fieldErrors } = error;
    setAddressFormErrors(fieldErrors);
    toast(<Message text={message} type="alert" />);
  };

  const handleUpdateIntervalSuccess = () => {
    toast(<Message text="Frequency changed successfully" type="success" />);
    refetchSubscriptions();
  };

  // Hooks
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

    startPauseSubscription: () => {
      setShowModalPause(true);
    },
    stopPauseSubscription: () => {
      setShowModalPause(false);
    },
    finishPauseSubscription: () => {
      pauseSubscription({ shopID, subscriptionID });
    },

    startCancelSubscription: () => {
      setShowModalDeactivate(true);
    },
    stopCancelSubscription: () => {
      setShowModalDeactivate(false);
    },
    finishCancelSubscription: () => {
      cancelSubscription({ shopID, subscriptionID });
    },

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
      shopID,
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
      showModalDeactivate,
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

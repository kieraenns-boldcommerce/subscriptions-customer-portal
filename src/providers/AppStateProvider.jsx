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

import { INITIAL_ADDRESS_STATE } from "../constants";


const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const AppStateProviderPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};


const formatAddressData = (data) => {
  const {
    id,
    customer_id: customerId,
    city,
    company: companyName,
    country,
    first_name: firstName,
    last_name: lastName,
    phone: phoneNumber,
    province: stateOrProvince,
    street1: addressLineFirst,
    street2: addressLineSecond,
    zip: zipOrPostalCode
  } = data;

  return {
    ...data,
    id,
    customerId,
    city,
    companyName,
    country,
    firstName,
    lastName,
    phoneNumber,
    stateOrProvince,
    addressLineFirst,
    addressLineSecond,
    zipOrPostalCode
  };
};

const formatAddressDataForServer = (data) => {
  const {
    id,
    customerId: customer_id,
    city,
    companyName: company,
    country,
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone,
    stateOrProvince: province,
    addressLineFirst: street1,
    addressLineSecond: street2,
    zipOrPostalCode: zip
  } = data;

  return {
    id,
    customer_id,
    city,
    company,
    country,
    first_name,
    last_name,
    phone,
    province,
    street1,
    street2,
    zip
  };
};


const AppStateProvider = (props) => {
  const { children } = props;

  // * States
  const [activeShop, setActiveShop] = useState({});
  const [activeShopId, setActiveShopId] = useState("");
  const [activeSubscriptionId, setActiveSubscriptionId] = useState(null);
  const [activeAddressData, setActiveAddressData] = useState({});
  const [innerSubscriptions, setInnerSubscriptions] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [activeSubscriptionOption, setActiveSubscriptionOption] = useState([]);
  const [innerSubscriptionIntervals, setInnerSubscriptionIntervals] = useState([]);
  const [messageData, setMessageData] = useState(null);
  const [modalConfirmData, setModalConfirmData] = useState(null);
  const [addressData, setAddressData] = useState(INITIAL_ADDRESS_STATE);
  const [activeMenuValue, setActiveMenuValue] = useState(null);


  // * Handlers
  const onSuccessChangeAddress = (response) => {
    if (response) fetchSubscriptions();
  };

  const onSuccessPauseSubscription = (response) => {
    if (response) fetchSubscriptions();
  };

  const onSuccessCancelSubscription = (response) => {
    if (response) fetchSubscriptions();
  };

  const onSuccessChangeSubscriptionInterval = (response) => {
    if (response) fetchSubscriptions();
  };


  // * Hooks
  const { shopInfo, isShopInfoLoading } = useGetShopInfo();

  const {
    subscriptions,
    isSubscriptionsLoading,
    fetchSubscriptions
  } = useGetSubscriptions({
    shopIdentifier: activeShopId
  });

  const {
    subscriptionIntervals,
    isSubscriptionIntervalsLoading,
    fetchSubscriptionIntervals
  } = useGetSubscriptionIntervals({
    shopIdentifier: activeShopId,
    subscriptionId: activeSubscriptionId
  });

  const {
    changeAddress,
    isChangeAddressLoading
  } = useChangeAddress({
    onSuccess: onSuccessChangeAddress
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
    onSuccess: onSuccessPauseSubscription
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


  // * Effect for shopInfo
  useEffect(() => {
    if (!shopInfo) return;

    const { shop_identifier: shopIdentifier } = shopInfo;

    setActiveShop(shopInfo);
    setActiveShopId(shopIdentifier);
  }, [shopInfo]);

  useEffect(() => {
    if (activeShopId) fetchSubscriptions();
  }, [activeShopId]);


  // * Effect for subscriptions
  useEffect(() => {
    if (!subscriptions) return;

    const innerSubscriptions = subscriptions.subscriptions.map((subscription) => {
      const {
        id,
        base_currency: baseCurrency,
        billing_address,
        billing_address_id: billingAddressId,
        charged_currency: currency,
        line_items: products,
        next_order_datetime: nextOrderDatetime,
        next_payment_datetime: nextPaymentDatetime,
        order_rrule_text: orderText,
        payment_rrule_text: paymentText,
        shipping_address,
        shipping_address_id: shippingAddressId,
        shipping_lines: shippingLines,
        shop_id: shopId,
        subscription_status: status
      } = subscription;

      const billingAddress = formatAddressData(billing_address);
      const shippingAddress = formatAddressData(shipping_address);

      return {
        id,
        baseCurrency,
        billingAddress,
        billingAddressId,
        currency,
        products,
        nextOrderDatetime,
        nextPaymentDatetime,
        orderText,
        paymentText,
        shippingAddress,
        shippingAddressId,
        shippingLines,
        shopId,
        status
      };
    });


    const subscriptionOptions = innerSubscriptions.map((subscription) => {
      const { id, nextOrderDatetime, products } = subscription;

      const nextOrder = new Date(nextOrderDatetime).toLocaleString(
        "en-US",
        {
          month: "long",
          year: "numeric",
          day: "numeric"
        });

      const optionName = products.length > 1 ? `${products.length} Products` : products[0].product_name;

      return {
        name: `${optionName} Subscription - ${String(id)}`,
        title: `${optionName} Subscription - #${String(id)}`,
        value: String(id),
        date: nextOrder
      };
    });

    setInnerSubscriptions(innerSubscriptions);
    setSubscriptionOptions(subscriptionOptions);

    if (!activeSubscriptionId) {
      setActiveSubscriptionOption(subscriptionOptions[0]);
      setActiveSubscriptionId(subscriptions.subscriptions[0].id);
    }
  }, [subscriptions]);


  // * Effect for intervals
  useEffect(() => {
    if (!subscriptionIntervals) return;

    const { intervals } = subscriptionIntervals;

    const innerSubscriptionIntervals = intervals.map((interval) => {
      const { interval_name, id } = interval;

      return {
        id,
        name: interval_name
      };
    });

    setInnerSubscriptionIntervals(innerSubscriptionIntervals);
  }, [subscriptionIntervals]);

  const activeSubscription = innerSubscriptions.find((subscription) => subscription.id === activeSubscriptionId);

  useEffect(() => {
    if (!activeSubscription) return;

    const { status } = activeSubscription;

    const isSubscriptionPaused = status === "paused";
    const isSubscriptionInactive = status === "inactive";
    const subscriptionStatus = isSubscriptionPaused ? "paused" : "canceled";
    
    setMessageData({
      text: `This subscription has been ${subscriptionStatus}.`,
      buttonText: `${isSubscriptionPaused ? "Resume" : "Reactivate"} subscription`
    });

    const data = {
      title: `Are you sure you want to ${subscriptionStatus} this subscription?`,
      textButtonCancel: `No, don’t ${subscriptionStatus}`,
      textButtonConfirm: `Yes, ${subscriptionStatus}`
    };

    if (isSubscriptionPaused) data.description = "This will pause all orders until the subscription is resumed.";
    if (isSubscriptionInactive) data.description = "This will cancel your subscription and all unprocessed orders.";

    setModalConfirmData(data);
  }, [activeSubscriptionId]);

  useEffect(() => {
    if (!activeMenuValue) return;

    const isSubscriptionPaused = activeMenuValue === "pause";
    const isSubscriptionInactive = activeMenuValue === "inactive";
    const subscriptionStatus = isSubscriptionPaused ? "paused" : "canceled";
    
    setMessageData({
      text: `This subscription has been ${subscriptionStatus}.`,
      buttonText: `${isSubscriptionPaused ? "Resume" : "Reactivate"} subscription`
    });

    const data = {
      title: `Are you sure you want to ${subscriptionStatus} this subscription?`,
      textButtonCancel: `No, don’t ${subscriptionStatus}`,
      textButtonConfirm: `Yes, ${subscriptionStatus}`
    };

    if (isSubscriptionPaused) data.description = "This will pause all orders until the subscription is resumed.";
    if (isSubscriptionInactive) data.description = "This will cancel your subscription and all unprocessed orders.";

    setModalConfirmData(data);
  }, [activeMenuValue]);

  const mainState = {
    state: {
      activeShop,
      isShopInfoLoading,
      activeShopId,
      activeSubscription,
      activeSubscriptionId,
      isSubscriptionIntervalsLoading,
      activeAddressData,
      isChangeAddressLoading,
      subscriptions: innerSubscriptions,
      subscriptionOptions,
      isSubscriptionsLoading,
      subscriptionIntervals: innerSubscriptionIntervals,
      isPauseSubscriptionLoading,
      isReactivateSubscriptionLoading,
      isCancelSubscriptionLoading,
      isChangeSubscriptionIntervalLoading,
      messageData,
      modalConfirmData,
      addressData,
      activeSubscriptionOption,
      activeMenuValue
    },
    methods: {
      formatAddressData,
      formatAddressDataForServer,
      setActiveSubscriptionId,
      fetchSubscriptionIntervals,
      setActiveAddressData,
      changeAddress,
      pauseSubscription,
      reactivateSubscription,
      cancelSubscription,
      changeSubscriptionInterval,
      setAddressData,
      setActiveSubscriptionOption,
      setActiveMenuValue
    }
  };

  return (
    <AppContext.Provider value={mainState}>
      { children }
    </AppContext.Provider>
  );
};

AppStateProvider.propTypes = AppStateProviderPropTypes;

export default AppStateProvider;

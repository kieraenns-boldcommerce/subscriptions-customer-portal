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
  const [activeSubscription, setActiveSubscription] = useState({});
  const [activeAddressData, setActiveAddressData] = useState({});
  const [innerSubscriptions, setInnerSubscriptions] = useState([]);
  const [serverSubscriptions, setServerSubscriptions] = useState([]);
  const [innerSubscriptionIntervals, setInnerSubscriptionIntervals] = useState([]);
  const [serverSubscriptionIntervals, setServerSubscriptionIntervals] = useState([]);


  // * Handlers
  const onSuccessChangeAddress = (response) => {
    if (response) fetchSubscriptions();
  };
  const onErrorChangeAddress = (error) => {
    console.log(error);
  };

  const onSuccessPauseSubscription = (response) => {
    if (response) fetchSubscriptions();
  };
  const onErrorPauseSubscription = (error) => {
    console.log(error);
  };

  const onSuccessCancelSubscription = (response) => {
    if (response) fetchSubscriptions();
  };
  const onErrorCancelSubscription = (error) => {
    console.log(error);
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

  console.log(subscriptions);

  const {
    subscriptionIntervals,
    isSubscriptionIntervalsLoading,
    fetchSubscriptionIntervals
  } = useGetSubscriptionIntervals({
    shopIdentifier: activeShopId,
    subscriptionId: activeSubscription && activeSubscription.id
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
    onSuccess: onSuccessPauseSubscription,
    onError: onErrorPauseSubscription
  });

  const {
    reactivateSubscription,
    isReactivateSubscriptionLoading
  } = useReactivateSubscription({
    onSuccess: onSuccessPauseSubscription,
    onError: onErrorPauseSubscription
  });

  const {
    cancelSubscription,
    isCancelSubscriptionLoading
  } = useCancelSubscription({
    onSuccess: onSuccessCancelSubscription,
    onError: onErrorCancelSubscription
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

    setInnerSubscriptions(innerSubscriptions);
    setServerSubscriptions(subscriptions.subscriptions);
  }, [subscriptions]);


  // * Effect for intervals
  useEffect(() => {
    if (!subscriptionIntervals) return;

    const { intervals } = subscriptionIntervals;

    // eslint-disable-next-line no-unused-vars
    const innerSubscriptionIntervals = intervals.map((interval) => {
      const { interval_name, id } = interval;

      return {
        id,
        name: interval_name
      };
    });

    setInnerSubscriptionIntervals(innerSubscriptionIntervals);
    setServerSubscriptionIntervals(intervals);
  }, [subscriptionIntervals]);


  const mainState = {
    state: {
      activeShop,
      isShopInfoLoading,
      activeShopId,
      activeSubscription,
      isSubscriptionIntervalsLoading,
      activeAddressData,
      isChangeAddressLoading,
      subscriptions: innerSubscriptions,
      serverSubscriptions,
      isSubscriptionsLoading,
      subscriptionIntervals: innerSubscriptionIntervals,
      serverSubscriptionIntervals,
      isPauseSubscriptionLoading,
      isReactivateSubscriptionLoading,
      isCancelSubscriptionLoading
    },
    methods: {
      formatAddressData,
      formatAddressDataForServer,
      setActiveSubscription,
      fetchSubscriptionIntervals,
      setActiveAddressData,
      changeAddress,
      pauseSubscription,
      reactivateSubscription,
      cancelSubscription
    }
  };

  console.log(mainState);

  return (
    <AppContext.Provider value={mainState}>
      { children }
    </AppContext.Provider>
  );
};

AppStateProvider.propTypes = AppStateProviderPropTypes;

export default AppStateProvider;

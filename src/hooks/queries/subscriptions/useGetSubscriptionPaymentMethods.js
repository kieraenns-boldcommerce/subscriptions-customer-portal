import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethods = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionPaymentMethods", shopIdentifier, subscriptionId],
    () => SubscriptionsService.getSubscriptionPaymentMethods({ shopIdentifier, subscriptionId }),
    { onSuccess }
  );

  return {
    subscriptionPaymentMethods: data,
    isSubscriptionPaymentMethodsLoading: isLoading,
    isSubscriptionPaymentMethodsFetching: isFetching,
    fetchSubscriptionPaymentMethods: refetch
  };
};

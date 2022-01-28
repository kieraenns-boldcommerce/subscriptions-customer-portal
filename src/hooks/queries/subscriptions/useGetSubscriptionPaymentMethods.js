import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethods = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionPaymentMethods"],
    () => SubscriptionsService.getSubscriptionPaymentMethods({ shopIdentifier, subscriptionId }),
    { onSuccess, enabled: false }
  );

  return {
    subscriptionPaymentMethods: data,
    isSubscriptionPaymentMethodsLoading: isLoading,
    isSubscriptionPaymentMethodsFetching: isFetching,
    fetchSubscriptionPaymentMethods: refetch
  };
};

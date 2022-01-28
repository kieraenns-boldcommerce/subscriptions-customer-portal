import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethod = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionPaymentMethod", subscriptionId],
    () => SubscriptionsService.getSubscriptionPaymentMethod({ shopIdentifier, subscriptionId }),
    { onSuccess, enabled: false }
  );

  return {
    subscriptionPaymentMethod: data,
    isSubscriptionPaymentMethodLoading: isLoading,
    isSubscriptionPaymentMethodFetching: isFetching,
    fetchSubscriptionPaymentMethod: refetch
  };
};

import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethod = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionPaymentMethod", shopIdentifier, subscriptionId],
    () => SubscriptionsService.getSubscriptionPaymentMethod({ shopIdentifier, subscriptionId }),
    { onSuccess }
  );

  return {
    subscriptionPaymentMethod: data,
    isSubscriptionPaymentMethodLoading: isLoading,
    isSubscriptionPaymentMethodFetching: isFetching,
    fetchSubscriptionPaymentMethod: refetch
  };
};

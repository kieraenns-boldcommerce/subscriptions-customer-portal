import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethod = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch } = useQuery(
    ["subscriptionPaymentMethod", shopIdentifier, subscriptionId],
    () => SubscriptionsService.getSubscriptionPaymentMethod({ shopIdentifier, subscriptionId }),
    { onSuccess, enabled: Boolean(shopIdentifier && subscriptionId) }
  );

  return {
    subscriptionPaymentMethod: data,
    isSubscriptionPaymentMethodLoading: isLoading,
    fetchSubscriptionPaymentMethod: refetch
  };
};

import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionPaymentMethod = (props) => {
  const { shopID, subscriptionID, onSuccess } = props;

  const { data, isLoading, refetch } = useQuery(
    ["subscriptionPaymentMethod", shopID, subscriptionID],
    () => SubscriptionsService.getSubscriptionPaymentMethod({ shopID, subscriptionID }),
    { onSuccess, enabled: Boolean(shopID && subscriptionID) }
  );

  return {
    subscriptionPaymentMethod: data,
    isSubscriptionPaymentMethodLoading: isLoading,
    fetchSubscriptionPaymentMethod: refetch
  };
};

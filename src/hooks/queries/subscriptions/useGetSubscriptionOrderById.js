import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionOrderById = (props) => {
  const { shopIdentifier, subscriptionId, orderId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionOrder", subscriptionId, shopIdentifier, orderId],
    () => SubscriptionsService.getSubscriptionOrderById({ subscriptionId, shopIdentifier, orderId }),
    { onSuccess }
  );

  return {
    subscriptionOrder: data,
    isSubscriptionOrderLoading: isLoading,
    isSubscriptionOrderFetching: isFetching,
    fetchSubscriptionOrder: refetch
  };
};

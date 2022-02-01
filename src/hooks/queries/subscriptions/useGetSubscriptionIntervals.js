import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionIntervals = (props) => {
  const { shopIdentifier, subscriptionId, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionIntervals", shopIdentifier, subscriptionId],
    () => SubscriptionsService.getSubscriptionIntervals({ shopIdentifier, subscriptionId }),
    { onSuccess, enabled: Boolean(shopIdentifier && subscriptionId) }
  );

  return {
    subscriptionIntervals: data,
    isSubscriptionIntervalsLoading: isLoading,
    isSubscriptionIntervalsFetching: isFetching,
    fetchSubscriptionIntervals: refetch
  };
};

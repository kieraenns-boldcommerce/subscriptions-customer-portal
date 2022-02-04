import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionIntervals = (props) => {
  const { shopID, subscriptionID, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscriptionIntervals", shopID, subscriptionID],
    () => SubscriptionsService.getSubscriptionIntervals({ shopID, subscriptionID }),
    { onSuccess, enabled: Boolean(shopID && subscriptionID) }
  );

  return {
    subscriptionIntervals: data,
    isSubscriptionIntervalsLoading: isLoading,
    isSubscriptionIntervalsFetching: isFetching,
    fetchSubscriptionIntervals: refetch
  };
};

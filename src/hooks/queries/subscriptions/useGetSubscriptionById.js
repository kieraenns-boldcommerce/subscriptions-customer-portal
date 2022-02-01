import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionById = (props) => {
  const { id, shopIdentifier, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["subscription", id, shopIdentifier],
    () => SubscriptionsService.getSubscriptionById({ id, shopIdentifier }),
    { onSuccess }
  );

  return {
    subscription: data,
    isSubscriptionLoading: isLoading,
    isSubscriptionFetching: isFetching,
    fetchSubscription: refetch
  };
};

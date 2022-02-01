import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptions = (params) => {
  const { shopIdentifier } = params;

  const { data, isLoading, refetch } = useQuery(
    ["subscriptions", params],
    () => SubscriptionsService.getSubscriptions(params),
    { enabled: Boolean(shopIdentifier) }
  );

  return {
    subscriptionsData: data,
    isSubscriptionsLoading: isLoading,
    fetchSubscriptions: refetch
  };
};

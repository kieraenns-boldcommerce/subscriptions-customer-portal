import { useQuery } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";

export const useGetSubscriptions = (params) => {
  const { shopID } = params;

  const { data, isLoading, refetch } = useQuery(
    ["subscriptions", params],
    () => SubscriptionsService.getSubscriptions(params),
    { enabled: Boolean(shopID) }
  );

  return {
    subscriptions: data,
    areSubscriptionsLoading: isLoading,
    refetchSubscriptions: refetch
  };
};

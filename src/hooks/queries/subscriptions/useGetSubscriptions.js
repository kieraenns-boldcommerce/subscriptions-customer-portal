import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptions = (params) => {
  const { data, isLoading, refetch } = useQuery(
    "subscriptions",
    () => SubscriptionsService.getSubscriptions(params),
    { enabled: false }
  );

  return {
    subscriptions: data,
    isSubscriptionsLoading: isLoading,
    fetchSubscriptions: refetch
  };
};

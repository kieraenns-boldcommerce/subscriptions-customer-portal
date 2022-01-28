import SubscriptionsService from "../../../api/services/SubscriptionsService";
import { useQuery } from "react-query";


export const useGetSubscriptionOrders = (params) => {
  const { data, isLoading, refetch } = useQuery("subscriptionOrders", () => SubscriptionsService.getSubscriptionOrders(params));

  return {
    subscriptionOrders: data,
    isSubscriptionOrdersLoading: isLoading,
    fetchSubscriptionOrders: refetch
  };
};

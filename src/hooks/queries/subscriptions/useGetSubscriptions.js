import { useQuery } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";

const useGetSubscriptions = (params) => {
  const { shopID, onSuccess } = params;

  const { data, isLoading, refetch } = useQuery(
    ["subscriptions", { shopID }],
    () => SubscriptionsService.getSubscriptions({ shopID }),
    { enabled: Boolean(shopID), onSuccess }
  );

  return {
    subscriptions: data,
    areSubscriptionsLoading: isLoading,
    refetchSubscriptions: refetch
  };
};

export default useGetSubscriptions;

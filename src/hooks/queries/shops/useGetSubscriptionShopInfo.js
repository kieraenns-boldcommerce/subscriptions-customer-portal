import ShopsService from "../../../api/services/ShopsService";
import { useQuery } from "react-query";


export const useGetSubscriptionShopInfo = (props) => {
  const { shopIdentifier, onSuccess } = props;

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["shopSubscriptionInfo", shopIdentifier],
    () => ShopsService.getSubscriptionShopInfo({ shopIdentifier }),
    { onSuccess, enabled: false }
  );

  return {
    subscriptionShopInfo: data,
    isSubscriptionShopInfoLoading: isLoading,
    isSubscriptionShopInfoFetching: isFetching,
    fetchSubscriptionShopInfo: refetch
  };
};

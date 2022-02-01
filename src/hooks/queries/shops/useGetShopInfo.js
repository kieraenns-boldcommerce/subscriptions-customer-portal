import ShopsService from "../../../api/services/ShopsService";
import { useQuery } from "react-query";


export const useGetShopInfo = () => {
  const { data, isLoading, refetch } = useQuery(
    ["shop"],
    () => ShopsService.getShopInfo()
  );

  return {
    shop: data,
    isShopInfoLoading: isLoading,
    fetchShopInfo: refetch
  };
};

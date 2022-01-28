import ShopsService from "../../../api/services/ShopsService";
import { useQuery } from "react-query";


export const useGetShopInfo = () => {
  const { data, isLoading, refetch } = useQuery(
    ["shopInfo"],
    () => ShopsService.getShopInfo()
  );

  return {
    shopInfo: data,
    isShopInfoLoading: isLoading,
    fetchShopInfo: refetch
  };
};

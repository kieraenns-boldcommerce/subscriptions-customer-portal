import { useQuery } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";

const useGetPaymentMethod = (params) => {
  const { shopID, subscriptionID } = params;

  const { data, isLoading } = useQuery(
    ["paymentMethod", params],
    () => SubscriptionsService.getPaymentMethod(params),
    { enabled: Boolean(shopID && subscriptionID) }
  );

  return {
    paymentMethod: data,
    isPaymentMethodLoading: isLoading
  };
};

export default useGetPaymentMethod;

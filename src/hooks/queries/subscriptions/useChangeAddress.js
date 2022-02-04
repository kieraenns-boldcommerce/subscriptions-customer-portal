import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const useChangeAddress = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation(
    ({ shopID, customerId, addressId, data }) => SubscriptionsService.changeAddress({ shopID, customerId, addressId, data }),
    { onSuccess, onError }
  );

  return { changeAddress: mutate, isChangeAddressLoading: isLoading };
};

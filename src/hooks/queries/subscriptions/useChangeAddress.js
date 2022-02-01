import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const useChangeAddress = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation(
    ({ shopIdentifier, customerId, addressId, data }) => SubscriptionsService.changeAddress({ shopIdentifier, customerId, addressId, data }), 
    {
      onSuccess,
      onError: async (error) => {
        const errorResp = await error.response?.data;

        if (!onError) return;
        return onError(errorResp);
      }
    }
  );

  return { changeAddress: mutate, isChangeAddressLoading: isLoading };
};

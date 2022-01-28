import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const useChangeSubscription = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation(
    ({ shopIdentifier, id, data }) => SubscriptionsService.changeSubscription({ shopIdentifier, id, data }), 
    {
      onSuccess,
      onError: async (error) => {
        const errorResp = await error.response?.data;

        if (!onError) return;
        return onError(errorResp);
      }
    }
  );

  return { changeSubscription: mutate, isChangeSubscriptionLoading: isLoading };
};

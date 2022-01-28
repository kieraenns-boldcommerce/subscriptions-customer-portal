import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const useChangeSubscriptionInterval = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation(
    ({
      shopIdentifier,
      subscriptionIntervalId,
      subscriptionId
    }) => SubscriptionsService.changeSubscription({ shopIdentifier, subscriptionIntervalId, subscriptionId }), 
    {
      onSuccess,
      onError: async (error) => {
        const errorResp = await error.response?.data;

        if (!onError) return;
        return onError(errorResp);
      }
    }
  );

  return { changeSubscriptionInterval: mutate, isChangeSubscriptionIntervalLoading: isLoading };
};

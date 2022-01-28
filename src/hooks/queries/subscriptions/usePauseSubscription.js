import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const usePauseSubscription = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation((data) => SubscriptionsService.pauseSubscription(data),
    {
      onSuccess,
      onError: async (error) => {
        const errorResp = await error.response?.data;

        if (!onError) return;
        return onError(errorResp);
      }
    }
  );

  return { pauseSubscription: mutate, isPauseSubscriptionLoading: isLoading };
};


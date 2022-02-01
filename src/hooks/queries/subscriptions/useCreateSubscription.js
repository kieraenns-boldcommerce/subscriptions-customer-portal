import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";


export const useCreateSubscription = (props) => {
  const { onSuccess, onError } = props;

  const { mutate, isLoading } = useMutation((data) => SubscriptionsService.createSubscription(data),
    {
      onSuccess,
      onError: async (error) => {
        const errorResp = await error.response?.data;

        if (!onError) return;
        return onError(errorResp);
      }
    }
  );

  return { createSubscription: mutate, isCreateSubscriptionLoading: isLoading };
};

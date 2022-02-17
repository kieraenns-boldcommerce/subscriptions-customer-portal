import { useMutation } from "react-query";
import SubscriptionsService from "../../../api/services/SubscriptionsService";

const useUpdatePaymentMethod = (params) => {
  const { onSuccess } = params;

  const { isLoading, mutate } = useMutation(
    (args) =>
      args.updateMethod === "trigger_email"
        ? SubscriptionsService.updatePaymentMethodEmail(args)
        : null,
    { onSuccess }
  );

  return {
    isPaymentMethodUpdating: isLoading,
    updatePaymentMethod: mutate,
  };
};

export default useUpdatePaymentMethod;

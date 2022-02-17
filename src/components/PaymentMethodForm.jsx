import {useContext} from "react";
import {AppStateContext} from "../AppState";
import {Button} from "react-query/types/devtools/styledComponents";

const PaymentMethodForm = () => {
  const { appState, appActions } = useContext(AppStateContext);

  const {
    paymentMethod
  } = appState;

  const {
    stopUpdatePaymentMethod,
    finishUpdatePaymentMethod
  } = appActions;

  const handleConfirmButtonClick = () => finishUpdatePaymentMethod(paymentMethod.updateMethod);
  const handleCancelButtonClick = () => stopUpdatePaymentMethod();

  return <>
    <Button onClick={handleConfirmButtonClick}>Send email</Button>
    <Button onClick={handleCancelButtonClick}>Cancel</Button>
  </>;
};

export default PaymentMethodForm;

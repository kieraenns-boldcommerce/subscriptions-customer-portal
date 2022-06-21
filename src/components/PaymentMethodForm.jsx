import { React, useContext } from "react";
import { AppStateContext } from "../AppState";
import styled from "styled-components";
import { Button } from "@boldcommerce/stacks-ui";
import Section from "./ui/Section";
import { PaymentUpdateMethod } from "../api/services/SubscriptionsService";

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin: 16px 0;
`;

const StyledPaymentIFrame = styled.iframe``;

const PaymentMethodForm = () => {
    const { appState, appActions } = useContext(AppStateContext);

    const { paymentMethod } = appState;

    const { stopUpdatePaymentMethod, finishUpdatePaymentMethod } = appActions;

    const handleConfirmButtonClick = () =>
        finishUpdatePaymentMethod(paymentMethod.updateMethod);
    const handleCancelButtonClick = () => stopUpdatePaymentMethod();

    return (
        <Section title="Editing payment method">
            {paymentMethod.updateMethod === PaymentUpdateMethod.EMAIL ? (
                <>
                    <span>
                        You can change the payment method by clicking on the link in the
                        email
                    </span>
                    <StyledButtons>
                        <Button onClick={handleCancelButtonClick}>Cancel</Button>
                        <Button primary onClick={handleConfirmButtonClick}>Send email</Button>
                    </StyledButtons>
                </>
            ) : (
                <StyledPaymentIFrame src={paymentMethod.updateUrl.url} />
            )}
        </Section>
    );
};

export default PaymentMethodForm;

import { useContext } from "react";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import DefaultLayout from "../layouts/default";
import Container from "../components/Container";
import NoSubscriptions from "../components/NoSubscriptions";
import Tabs from "../components/ui/Tabs";
import Address from "../components/Address";
import AddressForm from "../components/AddressForm";
import ProductList from "../components/ProductList";
import FrequencyAndPayment from "../components/FrequencyAndPayment";
import TopSection from "../components/TopSection";
import ModalConfirm from "../components/ui/ModalConfirm";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";

const StyledTitle = styled.h1`
  margin-bottom: 38px;

  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 34px;

  @media (min-width: 576px) {
    margin-bottom: 60px;
  }
`;

const StyledPaymentContent = styled.div`
  min-height: 120px;
  background-color: rgba(0, 0, 0, 0.2);
`;

// const StyledFormContainer = styled.div`
//   max-height: ${({ showForm }) => showForm ? 960 : 0}px;

//   transition: max-height 0.4s;
//   overflow: hidden;

//   @media (min-width: 768px) {
//     max-height: ${({ showForm }) => showForm ? 450 : 0}px;
//   }
// `;

const StyledTopSectionContainer = styled.div`
  margin-bottom: 30px;
`;

const StyledFullPageSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  .stx-loading-spinner {
    width: 50px;
    height: 50px;
  }
`;

const IndexPage = () => {
  // * States

  // const formContainerRef = useRef(null);

  const { state, actions } = useContext(AppContext);
  const {
    subscriptions,
    isAppLoadingInitial,
    isAppLoading,
    showModalPause,
    showModalCancel,
    showShippingAddressForm,
    showBillingAddressForm,
    showIntervalForm,
    showPaymentMethodForm
  } = state;

  const {
    stopPauseSubscription,
    finishPauseSubscription,
    stopCancelSubscription,
    finishCancelSubscription
  } = actions;

  // * Handlers

  const handlePauseModalConfirm = () => finishPauseSubscription();
  const handlePauseModalCancel = () => stopPauseSubscription();
  const handleCancelModalConfirm = () => finishCancelSubscription();
  const handleCancelModalCancel = () => stopCancelSubscription();

  const tabs = [
    {
      content: <Address type="shipping" />,
      isActive: showShippingAddressForm
    },
    {
      content: <Address type="billing" />,
      isActive: showBillingAddressForm
    },
    {
      content: <FrequencyAndPayment />,
      isActive: showIntervalForm || showPaymentMethodForm
    }
  ];

  const showSpinner = isAppLoadingInitial;
  const showNoSubscriptions = !showSpinner && subscriptions.length === 0;
  const showSubscriptions = !showSpinner && !showNoSubscriptions;

  return (
    <DefaultLayout>
      <Container>

        {showSpinner && (
          <StyledFullPageSpinner>
            <LoadingSpinner />
          </StyledFullPageSpinner>
        )}

        {showNoSubscriptions && (
          <>

            <StyledTitle>My Subscriptions</StyledTitle>

            <NoSubscriptions />

          </>
        )}

        {showSubscriptions && (
          <>

            <StyledTitle>My Subscriptions</StyledTitle>

            <StyledTopSectionContainer>
              <TopSection />
            </StyledTopSectionContainer>

            <Tabs tabs={tabs} />

            {/* <StyledFormContainer
              showForm={showAnyForm}
              ref={formContainerRef}
              onTransitionEnd={onFormCollapse}
            >
              {showBillingAddress && (
                <AddressForm
                  type="billing"
                  data={subscription?.billingAddress}
                  onCancel={onCancelFormButtonClick}
                />
              )}
              {showShippingAddress && (
                <AddressForm
                  type="shipping"
                  data={subscription?.shippingAddress}
                  onCancel={onCancelFormButtonClick}
                />
              )}
              {showPaymentMethod && (
                <StyledPaymentContent />
              )}
            </StyledFormContainer> */}

            { showShippingAddressForm && <AddressForm type="shipping" /> }

            { showBillingAddressForm && <AddressForm type="billing" /> }

            { showPaymentMethodForm && <StyledPaymentContent /> }

            <ProductList />

            {showModalPause && (
              <ModalConfirm
                title="Are you sure you want to pause this subscription?"
                description="This will pause all orders until the subscription is resumed"
                textButtonCancel="No, don’t pause"
                textButtonConfirm="Yes, pause"
                disabled={isAppLoading}
                onConfirm={handlePauseModalConfirm}
                onCancel={handlePauseModalCancel}
              />
            )}

            {showModalCancel && (
              <ModalConfirm
                title="Are you sure you want to cancel this subscription?"
                description="This will cancel your subscription and all unprocessed orders"
                textButtonCancel="No, don’t cancel"
                textButtonConfirm="Yes, cancel"
                disabled={isAppLoading}
                onConfirm={handleCancelModalConfirm}
                onCancel={handleCancelModalCancel}
              />
            )}

          </>
        )}

      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

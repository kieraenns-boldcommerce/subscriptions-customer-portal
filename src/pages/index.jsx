import { useState, useEffect, useRef, useContext } from "react";
import { LoadingSpinner } from "@boldcommerce/stacks-ui";
import DefaultLayout from "../layouts/default";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Address from "../components/Address";
import AddressForm from "../components/AddressForm";
import ProductList from "../components/ProductList";
import FrequencyAndPayment from "../components/FrequencyAndPayment";
import TopSection from "../components/TopSection";
import Section from "../components/Section";
import ModalConfirm from "../components/ModalConfirm";
import Notification from "../components/Notification";
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

const StyledFormContainer = styled.div`
  max-height: ${({ showForm }) => showForm ? 960 : 0}px;

  transition: max-height 0.4s;
  overflow: hidden;

  @media (min-width: 768px) {
    max-height: ${({ showForm }) => showForm ? 450 : 0}px;
  }
`;

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

const StyledSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
`;


const IndexPage = () => {
  // * States
  const [activeMenuValue, setActiveMenuValue] = useState(null);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showOrderFrequency, setShowOrderFrequency] = useState(false);
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showAnyForm, setShowAnyForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formContainerRef = useRef(null);

  const { state, methods } = useContext(AppContext);
  const {
    shopId,
    activeSubscription,
    activeSubscriptionId,
    isAppLoading,
    isChangeAddressLoading,
    isChangeSubscriptionIntervalLoading
  } = state;
  const {
    pauseSubscription,
    reactivateSubscription,
    cancelSubscription
  } = methods;


  // * Handlers
  const onMenuItemChange = (item) => {
    setActiveMenuValue(item.value);
    setShowModal(true);
  };

  const onCancelFormButtonClick = () => setShowAnyForm(false);
  const onConfirmFormButtonClick = () => setShowAnyForm(false);

  const onCancelModalButtonClick = () => setShowModal(false);
  const onConfirmModalButtonClick = () => {
    setShowModal(false);
    setShowAnyForm(false);
    setActiveMenuValue(null);

    if (activeMenuValue === "resume") {
      reactivateSubscription({
        shopIdentifier: shopId,
        subscriptionId: activeSubscriptionId
      });

      setShowSubscriptionMessage(false);
      return;
    }

    if (activeMenuValue === "inactive") {
      cancelSubscription({
        shopIdentifier: shopId,
        subscriptionId: activeSubscriptionId
      });

      setShowSubscriptionMessage(true);
      return;
    }

    pauseSubscription({
      shopIdentifier: shopId,
      subscriptionId: activeSubscriptionId
    });

    setShowSubscriptionMessage(true);
  };

  const onEditShippingAddress = () => {
    setShowAnyForm(true);
    setShowShippingAddress(true);
    setShowBillingAddress(false);
    setShowPaymentMethod(false);
    setShowOrderFrequency(false);
  };

  const onEditBillingAddress = () => {
    setShowAnyForm(true);
    setShowBillingAddress(true);
    setShowShippingAddress(false);
    setShowPaymentMethod(false);
    setShowOrderFrequency(false);
  };

  const onEditPaymentMethod = () => {
    setShowAnyForm(true);
    setShowPaymentMethod(true);
    setShowShippingAddress(false);
    setShowBillingAddress(false);
    setShowOrderFrequency(false);
  };

  const onEditOrderFrequency = () => {
    setShowOrderFrequency((v) => !v);
    setShowAnyForm(false);
  };

  const onFormCollapse = () => {
    if (showAnyForm) return;

    setShowBillingAddress(false);
    setShowPaymentMethod(false);
    setShowShippingAddress(false);
  };

  const onMessageButtonClick = () => {
    reactivateSubscription({
      shopIdentifier: shopId,
      subscriptionId: activeSubscriptionId
    });

    setShowSubscriptionMessage(false);
  };

  useEffect(() => {
    if (!activeSubscriptionId) return;

    const isInactiveSubscription = activeSubscription.status === "inactive" || activeSubscription.status === "paused";

    setShowSubscriptionMessage(isInactiveSubscription);
    setShowAnyForm(false);
    setShowOrderFrequency(false);
  }, [activeSubscriptionId]);


  const tabs = [
    {
      content: (
        <Address
          type="shipping"
          data={activeSubscription?.shippingAddress}
          showEditButton={!showShippingAddress && !showSubscriptionMessage}
          altTextEditButton="Edit shipping address"
          onEdit={onEditShippingAddress}
        />
      ),
      isActive: showShippingAddress
    },
    {
      content: (
        <Address
          type="billing"
          data={activeSubscription?.billingAddress}
          showEditButton={!showBillingAddress && !showSubscriptionMessage}
          altTextEditButton="Edit billing address"
          onEdit={onEditBillingAddress}
        />
      ),
      isActive: showBillingAddress
    },
    { 
      content: (
        <FrequencyAndPayment 
          editModeFrequency={!showOrderFrequency && !showSubscriptionMessage && !isChangeSubscriptionIntervalLoading}
          editModePayment={!showPaymentMethod && !showSubscriptionMessage}
          onEditFrequency={onEditOrderFrequency}
          onEditPayment={onEditPaymentMethod}
        />
      ),
      isActive: showPaymentMethod || showOrderFrequency
    }
  ];

  return (
    <DefaultLayout>
      <Container>

        <Notification />

        {isAppLoading ? (
          <StyledFullPageSpinner>
            <LoadingSpinner />
          </StyledFullPageSpinner>
        ) : (
          <>
            <StyledTitle>My Subscriptions</StyledTitle>
      
            <StyledTopSectionContainer>
              <TopSection
                label="Subscriptions"
                onMenuItemChange={onMenuItemChange}
                showMessage={showSubscriptionMessage}
                onMessageButtonClick={onMessageButtonClick}
              />
            </StyledTopSectionContainer>

            <Section>
              <Tabs tabs={tabs} />

              {isChangeAddressLoading && (
                <StyledSpinner>
                  <LoadingSpinner />
                </StyledSpinner>
              )}
            </Section>

            <StyledFormContainer
              showForm={showAnyForm}
              ref={formContainerRef}
              onTransitionEnd={onFormCollapse}
            >
              {showBillingAddress && (
                <AddressForm
                  type="billing"
                  data={activeSubscription?.billingAddress}
                  onConfirm={onConfirmFormButtonClick}
                  onCancel={onCancelFormButtonClick}
                />
              )}
              {showShippingAddress && (
                <AddressForm
                  type="shipping"
                  data={activeSubscription?.shippingAddress}
                  onConfirm={onConfirmFormButtonClick}
                  onCancel={onCancelFormButtonClick}
                />
              )}
              {showPaymentMethod && (
                <StyledPaymentContent />
              )}
            </StyledFormContainer>
      
            <ProductList />

            {activeMenuValue === "pause" && (
              <ModalConfirm
                isVisible={showModal}
                title="Are you sure you want to pause this subscription?"
                description="This will pause all orders until the subscription is resumed."
                textButtonCancel="No, don’t pause"
                textButtonConfirm="Yes, pause"
                onCancel={onCancelModalButtonClick}
                onConfirm={onConfirmModalButtonClick}
              />
            )}

            {activeMenuValue === "inactive" && (
              <ModalConfirm
                isVisible={showModal}
                title="Are you sure you want to cancel this subscription?"
                description="This will cancel your subscription and all unprocessed orders."
                textButtonCancel="No, don’t cancel"
                textButtonConfirm="Yes, cancel"
                onCancel={onCancelModalButtonClick}
                onConfirm={onConfirmModalButtonClick}
              />
            )}

            {activeMenuValue === "resume" && (
              <ModalConfirm
                isVisible={showModal}
                title="Are you sure you want to resume this subscription?"
                textButtonCancel="No, don’t resume"
                textButtonConfirm="Yes, resume"
                onCancel={onCancelModalButtonClick}
                onConfirm={onConfirmModalButtonClick}
              />
            )}
          </>
        )}

      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

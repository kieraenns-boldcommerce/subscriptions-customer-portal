/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from "react";
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
import styled from "styled-components";
import AppContext from "../contexts/AppContext";

import { LoadingSpinner } from "@boldcommerce/stacks-ui";


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

const StyledSpinner = styled.div`
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
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showOrderFrequency, setShowOrderFrequency] = useState(false);
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showAnyForm, setShowAnyForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [modalConfirmData, setModalConfirmData] = useState({});
  const { title, description, textButtonCancel, textButtonConfirm } = modalConfirmData;

  const formContainerRef = useRef(null);

  const { state, methods } = useContext(AppContext);
  const {
    activeShopId,
    activeSubscription,
    isPauseSubscriptionLoading,
    isReactivateSubscriptionLoading,
    isCancelSubscriptionLoading,
    isSubscriptionsLoading,
    isShopInfoLoading
  } = state;
  const { pauseSubscription, reactivateSubscription, cancelSubscription } = methods;


  // * Handlers
  const onMenuItemChange = (item) => {
    setActiveMenuItem(item);
    setShowModal(true);
  };

  const onCancelFormButtonClick = () => setShowAnyForm(false);
  const onConfirmFormButtonClick = () => setShowAnyForm(false);

  const onCancelModalButtonClick = () => setActiveMenuItem(null);

  const onConfirmModalButtonClick = () => {
    setShowModal(false);
    setShowAnyForm(false);

    if (activeMenuItem.value === "resume") {
      reactivateSubscription({
        shopIdentifier: activeShopId,
        subscriptionId: activeSubscription.id
      });

      setShowSubscriptionMessage(false);
      return;
    }

    if (activeMenuItem.value === "cancel") {
      cancelSubscription({
        shopIdentifier: activeShopId,
        subscriptionId: activeSubscription.id
      });

      return;
    }

    pauseSubscription({
      shopIdentifier: activeShopId,
      subscriptionId: activeSubscription.id
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
      shopIdentifier: activeShopId,
      subscriptionId: activeSubscription.id
    });

    setShowSubscriptionMessage(false);
  };


  // * Effects
  useEffect(() => {
    if (!activeMenuItem) return;

    const { value } = activeMenuItem;
    
    setModalConfirmData({
      title: `Are you sure you want to ${value} this subscription?`,
      description: value === "pause" ? 
        "This will pause all orders until the subscription is resumed." : 
        value === "cancel" ? "This will cancel your subscription and all unprocessed orders." : null,
      textButtonCancel: `No, don’t ${value}`,
      textButtonConfirm: `Yes, ${value}`
    });
  }, [activeMenuItem]);


  useEffect(() => {
    if (activeSubscription.status === "inactive" ||
        activeSubscription.status === "paused") {
      setShowSubscriptionMessage(true);
    }
  }, [activeSubscription]);


  const tabs = [
    {
      content: (
        <Address
          type="shipping"
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
          editModeFrequency={!showOrderFrequency && !showSubscriptionMessage}
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

        { isShopInfoLoading ||
          isSubscriptionsLoading ||
          isPauseSubscriptionLoading ||
          isReactivateSubscriptionLoading ||
          isCancelSubscriptionLoading ? (
            <StyledSpinner>
              <LoadingSpinner />
            </StyledSpinner>
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
              </Section>
              <StyledFormContainer showForm={showAnyForm} ref={formContainerRef} onTransitionEnd={onFormCollapse}>
                {showBillingAddress && (
                  <AddressForm
                    onConfirm={onConfirmFormButtonClick}
                    onCancel={onCancelFormButtonClick}
                  />
                )}
                {showShippingAddress && (
                  <AddressForm
                    onConfirm={onConfirmFormButtonClick}
                    onCancel={onCancelFormButtonClick}
                  />
                )}
                {showPaymentMethod && (
                  <StyledPaymentContent />
                )}
              </StyledFormContainer>
      
              <ProductList />
      
              <ModalConfirm
                isVisible={showModal}
                title={title}
                description={description}
                textButtonCancel={textButtonCancel}
                textButtonConfirm={textButtonConfirm}
                onCancel={onCancelModalButtonClick}
                onConfirm={onConfirmModalButtonClick}
              />
            </>
          )}

      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

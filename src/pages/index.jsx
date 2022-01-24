import { useState, useEffect } from "react";
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


const OPTIONS_ORDER_FREQUENCE = [
  { name: "Every 1 week", value: "every-one-week" },
  { name: "Every 2 weeks", value: "every-two-weeks" },
  { name: "Every month", value: "every-month" }
];

const OPTIONS_SUBSCRIPTIONS = [
  { name: "<product name>", value: "1035489" },
  { name: "<product name2>", value: "2145590" }
];

const products = [
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1643587200&Signature=g~KjnfR8XdruHS-ngNiZtLfYdulJ837pX6nz2K-LpgduT8lvbnUYBEK~f8Kphewyt9lkWD1N~iRXdhRDRXjPFmt9FBQpHMaIooG529yTsZosSu8sALRFHKO8U06Eq1n~jlHLEgoJuetgkWzP69C0y7dt1SfTM13UU9z67pAN0idpTszu2H0zEs3nu71dL0rCXVjRnIEjijCkg0w3nrqwqtctMsZhVeKptQLKzEWUgMmQEnLUFnHonOJVQiL58P~-qzxD4XCezxeg5j0ibuv~uY3~F2-lUV2EpfSGXhoNhTopv9DTw7V48eb1NG-VXE8n9dTsULizjWO6uaIYG6hk8Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1643587200&Signature=g~KjnfR8XdruHS-ngNiZtLfYdulJ837pX6nz2K-LpgduT8lvbnUYBEK~f8Kphewyt9lkWD1N~iRXdhRDRXjPFmt9FBQpHMaIooG529yTsZosSu8sALRFHKO8U06Eq1n~jlHLEgoJuetgkWzP69C0y7dt1SfTM13UU9z67pAN0idpTszu2H0zEs3nu71dL0rCXVjRnIEjijCkg0w3nrqwqtctMsZhVeKptQLKzEWUgMmQEnLUFnHonOJVQiL58P~-qzxD4XCezxeg5j0ibuv~uY3~F2-lUV2EpfSGXhoNhTopv9DTw7V48eb1NG-VXE8n9dTsULizjWO6uaIYG6hk8Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1643587200&Signature=g~KjnfR8XdruHS-ngNiZtLfYdulJ837pX6nz2K-LpgduT8lvbnUYBEK~f8Kphewyt9lkWD1N~iRXdhRDRXjPFmt9FBQpHMaIooG529yTsZosSu8sALRFHKO8U06Eq1n~jlHLEgoJuetgkWzP69C0y7dt1SfTM13UU9z67pAN0idpTszu2H0zEs3nu71dL0rCXVjRnIEjijCkg0w3nrqwqtctMsZhVeKptQLKzEWUgMmQEnLUFnHonOJVQiL58P~-qzxD4XCezxeg5j0ibuv~uY3~F2-lUV2EpfSGXhoNhTopv9DTw7V48eb1NG-VXE8n9dTsULizjWO6uaIYG6hk8Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1643587200&Signature=g~KjnfR8XdruHS-ngNiZtLfYdulJ837pX6nz2K-LpgduT8lvbnUYBEK~f8Kphewyt9lkWD1N~iRXdhRDRXjPFmt9FBQpHMaIooG529yTsZosSu8sALRFHKO8U06Eq1n~jlHLEgoJuetgkWzP69C0y7dt1SfTM13UU9z67pAN0idpTszu2H0zEs3nu71dL0rCXVjRnIEjijCkg0w3nrqwqtctMsZhVeKptQLKzEWUgMmQEnLUFnHonOJVQiL58P~-qzxD4XCezxeg5j0ibuv~uY3~F2-lUV2EpfSGXhoNhTopv9DTw7V48eb1NG-VXE8n9dTsULizjWO6uaIYG6hk8Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  }
];

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


const IndexPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState();
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);

  const [modalConfirmData, setModalConfirmData] = useState({});
  const { title, description, textButtonCancel, textButtonConfirm } = modalConfirmData;

  const showModal = Boolean(activeMenuItem);

  const onMenuItemChange = (item) => setActiveMenuItem(item);
  const onCloseFormButtonClick = () => {
    setShowBillingForm(false);
    setShowPaymentForm(false);
    setShowShippingForm(false);
  };
  const onCloseModalButtonClick = () => setActiveMenuItem(null);
  const onConfirmModalButtonClick = () => {
    setActiveMenuItem(null);
    setShowSubscriptionMessage(true);
  };

  const onEditShippingAddress = () => {
    setShowShippingForm((v) => !v);
    setShowBillingForm(false);
    setShowPaymentForm(false);
  };

  const onEditBillingAddress = () => {
    setShowBillingForm((v) => !v);
    setShowShippingForm(false);
    setShowPaymentForm(false);
  };

  const onEditPaymentMethod = () => {
    setShowPaymentForm((v) => !v);
    setShowShippingForm(false);
    setShowBillingForm(false);
  };

  useEffect(() => {
    if (!activeMenuItem) return;

    const { value } = activeMenuItem;
    
    setModalConfirmData({
      title: `Are you sure you want to ${value} this subscription?`,
      description: value === "pause" ? 
        "This will pause all orders until the subscription is resumed." : 
        "This will cancel your subscription and all unprocessed orders.",
      textButtonCancel: `No, don’t ${value}`,
      textButtonConfirm: `Yes, ${value}`
    });
  }, [activeMenuItem]);


  const tabs = [
    {
      content: (
        <Address
          type="shipping"
          firstName="Jodeci"
          lastName="Correa"
          addressLineFirst="27 Main Street"
          city="Winnipeg"
          stateOrProvince="Manitoba"
          zipOrPostalCode="R3W 4S5"
          country="Canada"
          phoneNumber="204-123-1234"
          companyName="Queens Gambit"
          showEditButton={true}
          onEdit={onEditShippingAddress}
        />
      ),
      isActive: showShippingForm
    },
    {
      content: (
        <Address
          type="billing"
          firstName="Jodeci"
          lastName="Correa"
          addressLineFirst="27 Main Street"
          city="Winnipeg"
          stateOrProvince="Manitoba"
          zipOrPostalCode="R3W 4S5"
          country="Canada"
          phoneNumber="204-123-1234"
          companyName="Queens Gambit"
          showEditButton={true}
          onEdit={onEditBillingAddress}
        />
      ),
      isActive: showBillingForm
    },
    { 
      content: (
        <FrequencyAndPayment 
          options={OPTIONS_ORDER_FREQUENCE}
          editMode={true}
          onPaymentEdit={onEditPaymentMethod}
        />
      ),
      isActive: showPaymentForm 
    }
  ];

  return (
    <DefaultLayout>
      <Container>

        <StyledTitle>My Subscriptions</StyledTitle>

        <TopSection
          options={OPTIONS_SUBSCRIPTIONS}
          label="Subscriptions"
          date="December 25, 2020"
          onMenuItemChange={onMenuItemChange}
          showMessage={showSubscriptionMessage}
          onMessageButtonClick={() => setShowSubscriptionMessage(false)}
        />

        <Section>
          <Tabs tabs={tabs} />
        </Section>

        {showBillingForm && (
          <AddressForm
            type="billing"
            onCancel={onCloseFormButtonClick}
          />
        )}
        {showShippingForm && (
          <AddressForm
            type="shipping"
            onCancel={onCloseFormButtonClick}
          />
        )}
        {showPaymentForm && (
          <StyledPaymentContent />
        )}

        <ProductList products={products} />

        <ModalConfirm
          title={title}
          description={description}
          textButtonCancel={textButtonCancel}
          textButtonConfirm={textButtonConfirm}
          isVisible={showModal}
          onCancel={onCloseModalButtonClick}
          onConfirm={onConfirmModalButtonClick}
        />

      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

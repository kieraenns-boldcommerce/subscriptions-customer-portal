import { useState } from "react";
import DefaultLayout from "../layouts/default";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Address from "../components/Address";
import AddressForm from "../components/AddressForm";
import ProductList from "../components/ProductList";
import FrequencyAndPayment from "../components/FrequencyAndPayment";
import Message from "../components/Message";
import TopSection from "../components/TopSection";
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
      />
    ),
    isActive: true
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
      />
    ),
    isActive: false
  },
  { 
    content: (
      <FrequencyAndPayment 
        orderFrequency={{
          options: OPTIONS_ORDER_FREQUENCE,
          onSave: (value) => {
            console.log(value);
          },
          editMode: true
        }}
        paymentMethod={{}}
      />
    ),
    isActive: false 
  }
];

const products = [
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1640563200&Signature=U4U-T7ez1vomGF-dNFIy30586Lcxcowua3n7sCl78rS91j42IU1raDKo2Pxaoms7kwxfsy0Sg-lZZA3VJjb24v-IVPUb54kQ-muvfuecN4Q8GgzUQFS1HmC2KpSsYgkQNZUYvkpkoWIcor8EFEDDsXk-bhpvc84DB5pyW6PxKM6gvqMf6bCiyntkKE~ZTwPbmz8p4QfHC-mKccPLM3sM-2U~~e4hmpW7a1n83~DK6hO~XMcmqRKpG2rNdSPO4ufNLsifT3srOFaIt~d9INlfM6c5LYUE6K-7Z9XpbRSBdrhCFAqH8IqPYshvcrUcX6Nsx9uOPte0GfNIV3wHJkF2Wg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1640563200&Signature=U4U-T7ez1vomGF-dNFIy30586Lcxcowua3n7sCl78rS91j42IU1raDKo2Pxaoms7kwxfsy0Sg-lZZA3VJjb24v-IVPUb54kQ-muvfuecN4Q8GgzUQFS1HmC2KpSsYgkQNZUYvkpkoWIcor8EFEDDsXk-bhpvc84DB5pyW6PxKM6gvqMf6bCiyntkKE~ZTwPbmz8p4QfHC-mKccPLM3sM-2U~~e4hmpW7a1n83~DK6hO~XMcmqRKpG2rNdSPO4ufNLsifT3srOFaIt~d9INlfM6c5LYUE6K-7Z9XpbRSBdrhCFAqH8IqPYshvcrUcX6Nsx9uOPte0GfNIV3wHJkF2Wg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1640563200&Signature=U4U-T7ez1vomGF-dNFIy30586Lcxcowua3n7sCl78rS91j42IU1raDKo2Pxaoms7kwxfsy0Sg-lZZA3VJjb24v-IVPUb54kQ-muvfuecN4Q8GgzUQFS1HmC2KpSsYgkQNZUYvkpkoWIcor8EFEDDsXk-bhpvc84DB5pyW6PxKM6gvqMf6bCiyntkKE~ZTwPbmz8p4QfHC-mKccPLM3sM-2U~~e4hmpW7a1n83~DK6hO~XMcmqRKpG2rNdSPO4ufNLsifT3srOFaIt~d9INlfM6c5LYUE6K-7Z9XpbRSBdrhCFAqH8IqPYshvcrUcX6Nsx9uOPte0GfNIV3wHJkF2Wg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/330a/3642/0669d5cc9ce3cade3874f65dfa4eaaab?Expires=1640563200&Signature=U4U-T7ez1vomGF-dNFIy30586Lcxcowua3n7sCl78rS91j42IU1raDKo2Pxaoms7kwxfsy0Sg-lZZA3VJjb24v-IVPUb54kQ-muvfuecN4Q8GgzUQFS1HmC2KpSsYgkQNZUYvkpkoWIcor8EFEDDsXk-bhpvc84DB5pyW6PxKM6gvqMf6bCiyntkKE~ZTwPbmz8p4QfHC-mKccPLM3sM-2U~~e4hmpW7a1n83~DK6hO~XMcmqRKpG2rNdSPO4ufNLsifT3srOFaIt~d9INlfM6c5LYUE6K-7Z9XpbRSBdrhCFAqH8IqPYshvcrUcX6Nsx9uOPte0GfNIV3wHJkF2Wg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "Product Name",
    variant: "Variant Name",
    price: 2499,
    quantity: 1
  }
];


const StyledTitle = styled.h1`
  margin: 0;
  margin-bottom: 38px;

  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 24px;

  @media (min-width: 576px) {
    margin-bottom: 60px;
  }
`;


const IndexPage = () => {
  const [activeSubscription, setActiveSubscription] = useState();
  const [activeMenuItem, setActiveMenuItem] = useState();

  console.log(activeSubscription);
  console.log(activeMenuItem);

  return (
    <DefaultLayout>
      <Container>

        <StyledTitle>My Subscriptions</StyledTitle>

        <TopSection
          options={OPTIONS_SUBSCRIPTIONS}
          label="Subscriptions"
          date="December 25, 2020"
          onChange={setActiveSubscription}
          onMenuItemClick={setActiveMenuItem}
        />

        <Message
          text="This subscription has been paused."
          buttonText="Resume subscription"
        />

        <Tabs tabs={tabs} />

        <AddressForm type="shipping" />

        <ProductList products={products} />

      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

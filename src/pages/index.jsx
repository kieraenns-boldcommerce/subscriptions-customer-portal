import DefaultLayout from "../layouts/default";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Address from "../components/Address";
import AddressForm from "../components/AddressForm";
import ProductList from "../components/ProductList";
import Message from "../components/Message";

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
  { content: "tab 3", isActive: false }
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

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Container>

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

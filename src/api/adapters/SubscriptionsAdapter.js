import renameKeys from "../../utils/renameKeys";
import AddressesAdapter from "./AddressesAdapter";
import ProductsAdapter from "./ProductsAdapter";

class SubscriptionsAdapter {
  static fromServer(subscription) {
    const subscriptionCopy = { ...subscription };

    subscriptionCopy.shipping_address = AddressesAdapter.fromServer(subscriptionCopy.shipping_address);
    subscriptionCopy.billing_address = AddressesAdapter.fromServer(subscriptionCopy.billing_address);
    subscriptionCopy.line_items = subscriptionCopy.line_items.map(ProductsAdapter.fromServer);

    return renameKeys(
      subscriptionCopy,
      [
        "subscription_status",
        "next_order_datetime",
        "shipping_address",
        "billing_address",
        "order_rrule_text",
        "line_items"
      ],
      [
        "status",
        "nextOrderDatetime",
        "shippingAddress",
        "billingAddress",
        "interval",
        "products"
      ]
    );
  }
}

export default SubscriptionsAdapter;

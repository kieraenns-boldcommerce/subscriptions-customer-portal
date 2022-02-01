import { ServiceBase } from "../core";
import { renameKeys } from "../../helpers/utils";


const adaptAddressDataFromServer = (address) => renameKeys(
  address,
  [
    "customer_id",
    "first_name",
    "last_name",
    "street1",
    "street2"
  ],
  [
    "customerId",
    "firstName",
    "lastName",
    "addressLineFirst",
    "addressLineSecond"
  ]
);

const adaptAddressDataToServer = (address) => renameKeys(
  address,
  [
    "customerId",
    "firstName",
    "lastName",
    "addressLineFirst",
    "addressLineSecond"
  ],
  [
    "customer_id",
    "first_name",
    "last_name",
    "street1",
    "street2"
  ]
);

const adaptIntervalFromServer = (interval) => {
  const { interval_name, id } = interval;

  return {
    id,
    name: interval_name,
    value: String(id)
  };
};

const adaptPaymentMethodFromServer = (payment) => {
  const renames = renameKeys(
    payment,
    [
      "type",
      "cc_type",
      "last_four"
    ],
    [
      "cardType",
      "paymentSystem",
      "lastFourNumbers"
    ]
  );

  const { expiration } = renames;

  const convertDate = new Date(expiration?.date);
  const year = convertDate.getFullYear().toString().slice(-2);
  const month = convertDate.getMonth() + 1;

  const adaptExpiresDate = `${month}/${year}`;

  return {
    ...renames,
    expiration: {
      ...expiration,
      date: adaptExpiresDate
    }
  };
};

const adaptProductsFromServer = (product) => {
  const {
    id,
    image,
    price,
    product_name,
    variant_name,
    quantity
  } = product;

  return {
    id,
    image,
    name: product_name,
    variant: variant_name,
    price,
    quantity
  };
};


class SubscriptionsService {
  static async getSubscriptions(params) {
    const { shopIdentifier } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/customers/${157112978}/subscriptions`;

    const data = {
      method,
      url
    };

    const {
      subscriptionStatus,
      boldPlatformCustomerId,
      expand,
      limit,
      sinceId,
      filter
    } = params;

    if (subscriptionStatus) data.params = { ...data.params, subscriptionStatus };
    if (boldPlatformCustomerId) data.params = { ...data.params, boldPlatformCustomerId };
    if (expand) data.params = { ...data.params, expand };
    if (limit) data.params = { ...data.params, limit };
    if (sinceId) data.params = { ...data.params, sinceId };
    if (filter) data.url = `${data.url}${filter}`;

    const response = await ServiceBase.callApi(data);

    const innerSubscriptions = response.subscriptions.map((subscription) => {
      const {
        id,
        base_currency: baseCurrency,
        billing_address,
        billing_address_id: billingAddressId,
        charged_currency: currency,
        line_items: products,
        next_order_datetime: nextOrderDatetime,
        next_payment_datetime: nextPaymentDatetime,
        order_rrule_text: frequency,
        payment_rrule_text: paymentText,
        shipping_address,
        shipping_address_id: shippingAddressId,
        shipping_lines: shippingLines,
        shop_id: shopId,
        subscription_status: status
      } = subscription;

      const billingAddress = adaptAddressDataFromServer(billing_address);
      const shippingAddress = adaptAddressDataFromServer(shipping_address);
      const innerProducts = products.map(adaptProductsFromServer);

      return {
        id,
        baseCurrency,
        billingAddress,
        billingAddressId,
        currency,
        products: innerProducts,
        nextOrderDatetime,
        nextPaymentDatetime,
        frequency,
        paymentText,
        shippingAddress,
        shippingAddressId,
        shippingLines,
        shopId,
        status
      };
    });

    return {
      ...response,
      subscriptions: innerSubscriptions
    };
  }

  static async getSubscriptionById(params) {
    const { shopIdentifier, id } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${id}`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async createSubscription(params) {
    const { shopIdentifier, data } = params;

    const method = "POST";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions`;

    const response = await ServiceBase.callApi({ data, method, url });

    return response;
  }

  static async changeAddress(params) {
    const { shopIdentifier, customerId, addressId, data } = params;

    const method = "PUT";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/customers/${customerId}/addresses/${addressId}`;

    const response = await ServiceBase.callApi({
      data: {
        customer_address: {
          ...adaptAddressDataToServer(data)
        }
      },
      method,
      url
    });

    return response;
  }

  static async getSubscriptionIntervals(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/intervals`;

    const response = await ServiceBase.callApi({ method, url });

    const result = response?.intervals.map(adaptIntervalFromServer);
  
    return result;
  }

  static async changeSubscriptionInterval(params) {
    const { shopIdentifier, subscriptionIntervalId, subscriptionId } = params;

    const method = "PUT";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/interval/${subscriptionIntervalId}`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async getSubscriptionPaymentMethods(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/payment_methods`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async getSubscriptionPaymentMethod(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/payment_method`;

    const response = await ServiceBase.callApi({ method, url });

    const result = adaptPaymentMethodFromServer(response?.payment_method);
  
    return result;
  }

  static async reactivateSubscription(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "POST";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/activate`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async cancelSubscription(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "POST";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/cancel`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async pauseSubscription(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "POST";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/pause`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }

  static async getSubscriptionOrders(params) {
    const { shopIdentifier, subscriptionId, page, limit } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/orders`;

    const data = {
      method,
      url
    };

    if (page) data.params = { ...data.params, page };
    if (limit) data.params = { ...data.params, limit };

    const response = await ServiceBase.callApi(data);

    return response;
  }

  static async getSubscriptionOrderById(params) {
    const { shopIdentifier, subscriptionId, orderId } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/orders/${orderId}`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
  }
}

export default SubscriptionsService;

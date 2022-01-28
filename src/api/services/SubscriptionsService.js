import PT from "prop-types";
import { ServiceBase } from "../core";


export const CreateSubscriptionDataPropTypes = {
  customer: PT.shape({
    firstName: PT.string.isRequired,
    lastName: PT.string.isRequired,
    email: PT.string.isRequired,
    phone: PT.string,
    notes: PT.string
  }),
  subscription: PT.shape({
    idempotencyKey: PT.string.isRequired,
    nextOrderDatetime: PT.string.isRequired,
    lastOrderDatetime: PT.string,
    subscriptionStatus: PT.oneOf(["active", "inactive", "paused"]),
    orderRrule: PT.string.isRequired,
    baseCurrency: PT.string.isRequired,
    chargedCurrency: PT.string.isRequired,
    baseToChargedExchangeRate: PT.number,
    lineItems: PT.arrayOf(PT.shape({
      platform_product_id: PT.string.isRequired,
      platform_variant_id: PT.string.isRequired,
      quantity: PT.number.isRequired,
      price: PT.number.isRequired,
      subscription_group_id: PT.number.isRequired
    })),
    billingAddress: PT.shape({
      firstName: PT.string.isRequired,
      lastName: PT.string.isRequired,
      company: PT.string,
      phone: PT.string,
      street1: PT.string.isRequired,
      street2: PT.string.isRequired,
      city: PT.string.isRequired,
      province: PT.string,
      provinceCode: PT.string,
      country: PT.string.isRequired,
      countryCode: PT.string.isRequired,
      zip: PT.string
    }),
    shippingAddress: PT.shape({
      firstName: PT.string.isRequired,
      lastName: PT.string.isRequired,
      company: PT.string,
      phone: PT.string,
      street1: PT.string.isRequired,
      street2: PT.string.isRequired,
      city: PT.string.isRequired,
      province: PT.string,
      provinceCode: PT.string,
      country: PT.string.isRequired,
      countryCode: PT.string.isRequired,
      zip: PT.string
    }),
    externalId: PT.string,
    note: PT.string,
    paymentDetails: PT.shape({
      gatewayName: PT.string,
      gatewayCustomerId: PT.string,
      gatewayPaymentId: PT.string
    })
  })
};

export const ChangeSubscriptionDataPropTypes = {
  subscription: PT.shape({
    id: PT.number.isRequired,
    externalId: PT.string.isRequired,
    shopId: PT.number.isRequired,
    nextOrderDatetime: PT.string.isRequired,
    nextPaymentDatetime: PT.string.isRequired,
    nextProcessingDatetime: PT.string.isRequired,
    subscriptionStatus: PT.oneOf(["active", "inactive", "paused", "scheduled", "processing", "app_uninstalled"]),
    statusChangedAt: PT.string.isRequired,
    paymentMethodToken: PT.string.isRequired,
    paymentGatewayPublicId: PT.string.isRequired,
    paymentRrule: PT.string.isRequired,
    paymentRruleText: PT.string.isRequired,
    orderRrule: PT.string.isRequired,
    orderRruleText: PT.string.isRequired,
    lastPaymentDatetime: PT.string.isRequired,
    lastOrderDatetime: PT.string.isRequired,
    lastProcessedDatetime: PT.string.isRequired,
    currentRetries: PT.number.isRequired,
    chargedCurrency: PT.string.isRequired,
    baseToChargedExchangeRate: PT.number.isRequired,
    baseCurrency: PT.string.isRequired,


    lineItems: PT.arrayOf(PT.shape({
      id: PT.number.isRequired,
      subscriptionId: PT.number.isRequired,
      platformId: PT.string.isRequired,
      platformProductId: PT.string.isRequired,
      platformVariantId: PT.string.isRequired,
      subscriptionGroupId: PT.number.isRequired,
      subscriptionGroupBillingRulesId: PT.number.isRequired,
      title: PT.string.isRequired,
      productName: PT.string.isRequired,
      variantName: PT.string.isRequired,
      sku: PT.string.isRequired,
      url: PT.string.isRequired,
      image: PT.string.isRequired,
      quantity: PT.number.isRequired,
      price: PT.number.isRequired,
      priceCharged: PT.number.isRequired,
      discountedPrice: PT.number.isRequired,
      discountedPriceCharged: PT.number.isRequired,
      fullPrice: PT.number.isRequired,
      fullPriceCharged: PT.number,
      requiresShipping: PT.bool.isRequired,
      grams: PT.number.isRequired,
      weight: PT.number.isRequired,
      weightUnit: PT.number.isRequired,
      taxable: PT.bool.isRequired,
      discounts: PT.any.isRequired,
      prepaidMetadata: PT.any.isRequired,
      lineItemAttributes: PT.any.isRequired,
      createdAt: PT.symbol.isRequired,
      updatedAt: PT.string.isRequired
    })),
    billingAddress: PT.shape({
      firstName: PT.string.isRequired,
      lastName: PT.string.isRequired,
      company: PT.string,
      phone: PT.string,
      street1: PT.string.isRequired,
      street2: PT.string.isRequired,
      city: PT.string.isRequired,
      province: PT.string,
      provinceCode: PT.string,
      country: PT.string.isRequired,
      countryCode: PT.string.isRequired,
      zip: PT.string
    }),
    shippingAddress: PT.shape({
      firstName: PT.string.isRequired,
      lastName: PT.string.isRequired,
      company: PT.string,
      phone: PT.string,
      street1: PT.string.isRequired,
      street2: PT.string.isRequired,
      city: PT.string.isRequired,
      province: PT.string,
      provinceCode: PT.string,
      country: PT.string.isRequired,
      countryCode: PT.string.isRequired,
      zip: PT.string
    }),
    note: PT.string,
    paymentDetails: PT.shape({
      gatewayName: PT.string,
      gatewayCustomerId: PT.string,
      gatewayPaymentId: PT.string
    })
  })
};

///////////


export const getSubscriptionsForAnyPropTypes = {
  shopIdentifier: PT.string.isRequired,
  subscriptionId: PT.number.isRequired
};

export const getSubscriptionsPropTypes = {
  shopIdentifier: PT.string.isRequired,
  subscriptionStatus: PT.arrayOf(PT.oneOf(["active", "inactive", "processing", "scheduled", "paused"])),
  boldPlatformCustomerId: PT.arrayOf(PT.number),
  expand: PT.arrayOf(PT.string),
  limit: PT.number,
  sinceId: PT.number,
  filter: PT.string
};

export const getSubscriptionByIdPropTypes = {
  shopIdentifier: PT.string.isRequired,
  id: PT.number.isRequired
};

export const createSubscriptionPropTypes = {
  shopIdentifier: PT.string.isRequired,
  data: PT.shape(CreateSubscriptionDataPropTypes)
};

export const changeSubscriptionPropTypes = {
  shopIdentifier: PT.string.isRequired,
  id: PT.string.isRequired,
  data: PT.shape(ChangeSubscriptionDataPropTypes)
};

export const changeSubscriptionIntervalPropTypes = {
  shopIdentifier: PT.string.isRequired,
  subscriptionIntervalId: PT.number.isRequired,
  subscriptionId: PT.number.isRequired
};

export const getSubscriptionOrdersPropTypes = {
  shopIdentifier: PT.string.isRequired,
  subscriptionId: PT.number.isRequired,
  page: PT.number.isRequired,
  limit: PT.number.isRequired
};

export const getSubscriptionOrderByIdPropTypes = {
  shopIdentifier: PT.string.isRequired,
  subscriptionId: PT.number.isRequired,
  orderId: PT.number.isRequired
};


class SubscriptionsService {
  static async getSubscriptions(params) {
    const { shopIdentifier } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions`;

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

    return response;
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

    const response = await ServiceBase.callApi({ data, method, url });

    return response;
  }

  static async getSubscriptionIntervals(params) {
    const { shopIdentifier, subscriptionId } = params;

    const method = "GET";
    const url = `/subscriptions/v1/shops/${shopIdentifier}/subscriptions/${subscriptionId}/intervals`;

    const response = await ServiceBase.callApi({ method, url });

    return response;
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

    return response;
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

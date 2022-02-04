import ServiceBase, { Method } from "../core";
import SubscriptionsAdapter from "../adapters/SubscriptionsAdapter";
import AddressesAdapter from "../adapters/AddressesAdapter";
import IntervalsAdapter from "../adapters/IntervalsAdapter";
import renameKeys from "../../utils/renameKeys";

const CUSTOMER_ID = "157112978";

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

class SubscriptionsService extends ServiceBase {
  static async getSubscriptions(params) {
    const { shopID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/customers/${CUSTOMER_ID}/subscriptions`;

    const { subscriptions } = await this.callAPI({ method, url });

    return subscriptions.map(SubscriptionsAdapter.fromServer);
  }

  static async getSubscriptionIntervals(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/intervals`;

    const { intervals } = await this.callAPI({ method, url });

    return intervals.map(IntervalsAdapter.fromServer);
  }

  static async getSubscriptionPaymentMethod(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/payment_method`;

    const response = await this.callAPI({ method, url });

    const result = adaptPaymentMethodFromServer(response?.payment_method);

    return result;
  }

  static async pauseSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/pause`;

    const response = await this.callAPI({ method, url });

    return response;
  }

  static async cancelSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/cancel`;

    const response = await this.callAPI({ method, url });

    return response;
  }

  static async reactivateSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/activate`;

    const response = await this.callAPI({ method, url });

    return response;
  }

  static async changeAddress(params) {
    const { shopID, addressId, data } = params;

    const method = Method.PUT;
    const url = `/subscriptions/v1/shops/${shopID}/customers/${CUSTOMER_ID}/addresses/${addressId}`;

    try {
      const response = await this.callAPI({
        data: {
          customer_address: {
            ...AddressesAdapter.toServer(data)
          }
        },
        method,
        url
      });

      return response;
    } catch (error) {
      throw AddressesAdapter.errorUpdate(error);
    }
  }

  static async changeSubscriptionInterval(params) {
    const { shopID, subscriptionIntervalId, subscriptionID } = params;

    const method = Method.PUT;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/interval/${subscriptionIntervalId}`;

    const response = await this.callAPI({ method, url });

    return response;
  }
}

export default SubscriptionsService;

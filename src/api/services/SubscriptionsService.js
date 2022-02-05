import ServiceBase, { Method } from "../core";
import SubscriptionsAdapter from "../adapters/SubscriptionsAdapter";
import AddressesAdapter from "../adapters/AddressesAdapter";
import IntervalsAdapter from "../adapters/IntervalsAdapter";
import PaymentMethodsAdapter from "../adapters/PaymentMethodsAdapter";

const CUSTOMER_ID = "157112978";

class SubscriptionsService extends ServiceBase {
  static async getSubscriptions(params) {
    const { shopID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/customers/${CUSTOMER_ID}/subscriptions`;

    const { subscriptions } = await this.callAPI({ method, url });

    return subscriptions.map(SubscriptionsAdapter.fromServer);
  }

  static async getIntervals(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/intervals`;

    const { intervals } = await this.callAPI({ method, url });

    return intervals.map(IntervalsAdapter.fromServer);
  }

  static async getPaymentMethod(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/payment_method`;

    const { payment_method } = await this.callAPI({ method, url });

    return PaymentMethodsAdapter.fromServer(payment_method);
  }

  static async pauseSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/pause`;

    await this.callAPI({ method, url });
  }

  static async cancelSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/cancel`;

    await this.callAPI({ method, url });
  }

  static async activateSubscription(params) {
    const { shopID, subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/activate`;

    await this.callAPI({ method, url });
  }

  static async updateAddress(params) {
    const { shopID, address } = params;
    const { id } = address;

    const method = Method.PUT;
    const url = `/subscriptions/v1/shops/${shopID}/customers/${CUSTOMER_ID}/addresses/${id}`;
    const data = { customer_address: AddressesAdapter.toServer(address) };

    try {
      await this.callAPI({ method, url, data });
    } catch (error) {
      throw AddressesAdapter.errorUpdate(error);
    }
  }

  static async updateInterval(params) {
    const { shopID, subscriptionID, intervalID } = params;

    const method = Method.PUT;
    const url = `/subscriptions/v1/shops/${shopID}/subscriptions/${subscriptionID}/interval/${intervalID}`;

    await this.callAPI({ method, url });
  }
}

export default SubscriptionsService;

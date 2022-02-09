import Cookies from "js-cookie";
import ServiceBase, { SHOP_DOMAIN, PLATFORM, Method, Cookie } from "../core";
import SubscriptionsAdapter from "../adapters/SubscriptionsAdapter";
import AddressesAdapter from "../adapters/AddressesAdapter";
import IntervalsAdapter from "../adapters/IntervalsAdapter";
import PaymentMethodsAdapter from "../adapters/PaymentMethodsAdapter";

class SubscriptionsService extends ServiceBase {
  static async getSubscriptions() {
    const { value } = await new Promise(
      (resolve) => window.BOLD.subscriptions.getJWT(resolve)
    );

    const {
      jwt: platformToken,
      customerId: customerID
    } = value;

    const { bold_platform_jwt: boldToken } = await this.callAPI({
      method: Method.GET,
      url: `/login?platform_customer_id=${customerID}&customer_jwt=${platformToken}&shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`
    });

    Cookies.set(Cookie.TOKEN, boldToken);
    Cookies.set(Cookie.CUSTOMER_ID, customerID);

    const { subscriptions } = await this.callAPI({
      method: Method.GET,
      url: `/customers/${customerID}/subscriptions?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`
    });

    return subscriptions.map(SubscriptionsAdapter.fromServer);
  }

  static async getIntervals(params) {
    const { subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/${subscriptionID}/intervals?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    const { intervals } = await this.callAPI({ method, url });

    return intervals.map(IntervalsAdapter.fromServer);
  }

  static async getPaymentMethod(params) {
    const { subscriptionID } = params;

    const method = Method.GET;
    const url = `/subscriptions/${subscriptionID}/payment_method?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    const { payment_method } = await this.callAPI({ method, url });

    return PaymentMethodsAdapter.fromServer(payment_method);
  }

  static async pauseSubscription(params) {
    const { subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/${subscriptionID}/pause?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    await this.callAPI({ method, url });
  }

  static async cancelSubscription(params) {
    const { subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/${subscriptionID}/cancel?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    await this.callAPI({ method, url });
  }

  static async activateSubscription(params) {
    const { subscriptionID } = params;

    const method = Method.POST;
    const url = `/subscriptions/${subscriptionID}/activate?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    await this.callAPI({ method, url });
  }

  static async updateAddress(params) {
    const { address } = params;
    const { id } = address;
    const customerID = Cookies.get(Cookie.CUSTOMER_ID);

    const method = Method.PUT;
    const url = `/customers/${customerID}/addresses/${id}?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;
    const data = { customer_address: AddressesAdapter.toServer(address) };

    try {
      await this.callAPI({ method, url, data });
    } catch (error) {
      throw AddressesAdapter.errorUpdate(error);
    }
  }

  static async updateInterval(params) {
    const { subscriptionID, intervalID } = params;

    const method = Method.PUT;
    const url = `/subscriptions/${subscriptionID}/interval/${intervalID}?shop=${SHOP_DOMAIN}&platform_type=${PLATFORM}`;

    await this.callAPI({ method, url });
  }
}

export default SubscriptionsService;

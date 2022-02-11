import Cookies from "js-cookie";
import ServiceBase, {Cookie, Method, PLATFORM, SHOP_DOMAIN} from "../core";
import SubscriptionsAdapter from "../adapters/SubscriptionsAdapter";
import AddressesAdapter from "../adapters/AddressesAdapter";
import IntervalsAdapter from "../adapters/IntervalsAdapter";
import PaymentMethodsAdapter from "../adapters/PaymentMethodsAdapter";

class SubscriptionsService extends ServiceBase {
  static async getSubscriptions() {
    const {
      value: {jwt: platformToken, customerId: platformCustomerID}
    } = await new Promise((resolve) => window.BOLD.subscriptions.getJWT(resolve));

    const {
      subscriptionsWebToken: boldToken,
      customer: {bold_platform_id: boldCustomerID}
    } = await this.callAPI({
      method: Method.GET,
      url: "/login",
      params: {
        platform_customer_id: platformCustomerID,
        customer_jwt: platformToken,
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });

    Cookies.set(Cookie.TOKEN, boldToken);
    Cookies.set(Cookie.CUSTOMER_ID, boldCustomerID);

    const {subscriptions} = await this.callAPI({
      method: Method.GET,
      url: `/customers/${boldCustomerID}/subscriptions`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });

    return subscriptions.map(SubscriptionsAdapter.fromServer);
  }

  static async getIntervals(params) {
    const {subscriptionID} = params;

    const {intervals} = await this.callAPI({
      method: Method.GET,
      url: `/subscriptions/${subscriptionID}/intervals`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });

    return intervals.map(IntervalsAdapter.fromServer);
  }

  static async getPaymentMethod(params) {
    const {subscriptionID} = params;

    const {payment_method} = await this.callAPI({
      method: Method.GET,
      url: `/subscriptions/${subscriptionID}/payment_method`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });

    return PaymentMethodsAdapter.fromServer(payment_method);
  }

  static async pauseSubscription(params) {
    const {subscriptionID} = params;

    await this.callAPI({
      method: Method.POST,
      url: `/subscriptions/${subscriptionID}/pause`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });
  }

  static async cancelSubscription(params) {
    const {subscriptionID} = params;

    await this.callAPI({
      method: Method.POST,
      url: `/subscriptions/${subscriptionID}/cancel`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });
  }

  static async activateSubscription(params) {
    const {subscriptionID} = params;

    await this.callAPI({
      method: Method.POST,
      url: `/subscriptions/${subscriptionID}/activate`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });
  }

  static async updateAddress(params) {
    console.log(" > params", params);
    const {address} = params;
    console.log(" > address", address);
    const {id} = address;
    console.log(" > id", id);
    const customerID = Cookies.get(Cookie.CUSTOMER_ID);

    try {
      await this.callAPI({
        method: Method.PUT,
        url: `/customers/${customerID}/addresses/${id}`,
        params: {
          shop: SHOP_DOMAIN,
          platform_type: PLATFORM
        },
        data: {customer_address: AddressesAdapter.toServer(address)}
      });
    } catch (error) {
      throw AddressesAdapter.errorUpdate(error);
    }
  }

  static async updateInterval(params) {
    const {subscriptionID, intervalID} = params;

    await this.callAPI({
      method: Method.PUT,
      url: `/subscriptions/${subscriptionID}/interval/${intervalID}`,
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });
  }
}

export default SubscriptionsService;

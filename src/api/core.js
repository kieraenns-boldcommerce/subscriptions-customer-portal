import axios from "axios";

const BASE_URL = "https://ark.onudu.com/https://sub.boldapps.net/api/customer";

export const SHOP_DOMAIN = "outside-digital.myshopify.com";
export const PLATFORM = "shopify";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

class ServiceBase {
  static subscriptionsToken = null;
  static subscriptionsCustomerId = null;

  static async obtainToken() {
    const {
      value: {jwt: platformToken, customerId: platformCustomerID}
    } = await new Promise((resolve) => window.BOLD.subscriptions.getJWT(resolve));

    const {
      subscriptionsWebToken: boldToken,
      subscriptionsWebTokenExpTime: tokenExpTime,
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

    this.subscriptionsToken = boldToken;
    this.subscriptionsCustomerId = boldCustomerID;

    this.setRefreshTokenTimeout(tokenExpTime);
  }

  static setRefreshTokenTimeout(expTime) {
    const timeoutMilliseconds = expTime - Date.now() - 60000; // 1minute before expiration
    console.log("timeout date is ", new Date(timeoutMilliseconds));
    setTimeout(async () => {
      const {
        token,
        tokenExpTime
      } = await this.callAPI({
        method: Method.GET,
        url: "/jwt/refresh",
        params: {
          shop: SHOP_DOMAIN,
          platform_type: PLATFORM
        }
      });
      this.subscriptionsToken = token;
      this.setRefreshTokenTimeout(tokenExpTime);
    }, timeoutMilliseconds);
  }

  static async callAPI({method, url, params, data = null}) {
    const config = {method, baseURL: BASE_URL, url, data, params};

    if ((!this.subscriptionsToken || !this.subscriptionsCustomerId) && url !== "/login" && url !== "/jwt/refresh") {
      await this.obtainToken();
    }
    if (this.subscriptionsToken) {
      config.headers = {Authorization: `Bearer ${this.subscriptionsToken}`};
    }

    const response = await axios.request(config);
    return response.data;
  }
}

export default ServiceBase;

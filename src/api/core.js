import axios from "axios";
import Cookies from "js-cookie";

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

export const Cookie = {
  TOKEN: "subscriptions_token",
  CUSTOMER_ID: "subscriptions_customer_id"
};

const updateCookieToken = (token, expTime) => {
  Cookies.set(Cookie.TOKEN, token, {expires: expTime});
  setTimeout(async () => {
    const {
      newToken,
      newTokenExpTime
    } = await this.callAPI({
      method: Method.GET,
      url: "/jwt/refresh",
      params: {
        shop: SHOP_DOMAIN,
        platform_type: PLATFORM
      }
    });
    console.log(" > newTokenExpTime", newTokenExpTime);
    updateCookieToken(newToken, newTokenExpTime);
  }, 1000 * 5); // refresh token every 5 seconds
  // }, expTime - 1000 * 60 * 5); // refresh token 5 minutes before expiring
};

class ServiceBase {
  static async obtainToken() {
    if (window.BOLD && (!Cookies.get(Cookie.TOKEN) || Cookies.get(Cookie.CUSTOMER_ID))) {
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

      Cookies.set(Cookie.CUSTOMER_ID, boldCustomerID);

      updateCookieToken(boldToken, tokenExpTime);
    }
  }

  static async callAPI({method, url, params, data = null}) {
    const config = {method, baseURL: BASE_URL, url, data, params};

    if (!Cookies.get(Cookie.TOKEN) && url !== "/login") {
      await this.obtainToken();
    }
    const token = Cookies.get(Cookie.TOKEN);
    if (token) config.headers = {Authorization: `Bearer ${token}`};

    const response = await axios.request(config);
    return response.data;
  }
}

export default ServiceBase;

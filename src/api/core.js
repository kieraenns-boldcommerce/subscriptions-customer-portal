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

class ServiceBase {
  static async callAPI({method, url, params, data = null}) {
    const config = {method, baseURL: BASE_URL, url, data, params};

    const token = Cookies.get(Cookie.TOKEN);
    if (token) config.headers = {Authorization: `Bearer ${token}`};

    const response = await axios.request(config);
    return response.data;
  }
}

export default ServiceBase;

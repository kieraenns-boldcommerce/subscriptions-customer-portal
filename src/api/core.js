import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://sub.boldapps.net/api/customer";

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
  TOKEN: "token",
  CUSTOMER_ID: "customer_id"
};

class ServiceBase {
  static async callAPI(params) {
    const { method, url, data = null } = params;
    const config = { method, baseURL: BASE_URL, url, data };

    const token = Cookies.get(Cookie.TOKEN);
    if (token) config.headers = { Authorization: `Bearer ${token}` };

    const response = await axios.request(config);
    return response.data;
  }
}

export default ServiceBase;

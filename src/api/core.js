import axios from "axios";
import { Handlers } from "../helpers/handlers";
// import * as Cookies from "js-cookie";

// const Url = process.env.REACT_APP_BASE_URL || "";
const Url = "https://ark.onudu.com/https://api.boldcommerce.com";
const AccessToken = "o3OAmcCJBapjybcPxqzaFs79RRs3PcYd";

export class ServiceBase {
  static async callApi({
    data = null,
    method,
    url,
    baseURL,
    contentType,
    params
  }) {
    const config = {
      baseURL,
      data,
      method,
      url,
      params,
      withCredentials: false
    };
    if (!config.baseURL) config.baseURL = baseURL || Url;

    config.headers = { Authorization: "Bearer " + AccessToken };
    // if (url !== "/login" && Cookies.get("accessToken")) {
    //   const token = Cookies.get("accessToken");
    //   config.headers = {
    //     Authorization: "Bearer " + token
    //   };
    // }
    if (contentType) {
      config.headers = {
        ...config.headers,
        "Content-Type": contentType
      };
    }

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, "response")) {
        Handlers.defaultErrorAPIHandler(
          error.response.data.error != null
            ? error.response.data.error
            : error.response.data,
          error.response.status
        );
        throw error;
      } else if (error.request) {
        Handlers.defaultErrorHandler(
          "Произошла ошибка при отправлении запроса, либо сервер не ответил вовремя"
        );
        throw error;
      }
    }
  }
}

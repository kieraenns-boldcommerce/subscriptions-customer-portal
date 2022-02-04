import axios from "axios";

const TOKEN = "o3OAmcCJBapjybcPxqzaFs79RRs3PcYd";
const BASE_URL = "https://ark.onudu.com/https://api.boldcommerce.com";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

class ServiceBase {
  static async callAPI(params) {
    const { method, url, data = null } = params;

    const config = {
      method,
      baseURL: BASE_URL,
      url,
      headers: { Authorization: `Bearer ${TOKEN}` },
      data
    };

    const response = await axios.request(config);
    return response.data;
  }
}

export default ServiceBase;

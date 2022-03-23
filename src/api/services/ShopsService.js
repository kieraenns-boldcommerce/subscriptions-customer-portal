import ServiceBase, { Method } from "../core";
import ShopsAdapter from "../adapters/ShopsAdapter";

class ShopsService extends ServiceBase {
    static async getShop() {
        console.log("oh?");
        
        const method = Method.GET;
        const url = "/shops/v1/info";

        const shop = await this.callAPI({ method, url });
        console.log(shop);

        return ShopsAdapter.fromServer(shop);
    }
}

export default ShopsService;

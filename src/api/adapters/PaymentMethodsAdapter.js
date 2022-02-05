import renameKeys from "../../utils/renameKeys";

class PaymentMethodsAdapter {
  static fromServer(paymentMethod) {
    return renameKeys(
      paymentMethod,
      ["cc_type", "last_four"],
      ["system", "lastFourDigits"]
    );
  }
}

export default PaymentMethodsAdapter;

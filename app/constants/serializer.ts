import { PaymentServiceProvider } from "../enums/IPaymentServiceProvider";
import { PaymentStatus } from "../enums/IPaymentStatus";

export const serializer = {
  paymentServiceProvoder: (serviceProvider: PaymentServiceProvider) => {
    switch (serviceProvider) {
      case PaymentServiceProvider.Cash:
        return "Cash";
      case PaymentServiceProvider.BankTransfer:
        return "Bank Transfer";
      case PaymentServiceProvider.Flutterwave:
        return "Flutterwave";
      case PaymentServiceProvider.Paystack:
        return "Paystack";

      default:
        break;
    }
  },
  paymentStatus: (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Pending:
        return "Pending";
      case PaymentStatus.Paid:
        return "Paid";
      case PaymentStatus.Failed:
        return "Failed";

      default:
        break;
    }
  }
};

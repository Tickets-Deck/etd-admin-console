import { PaymentStatus } from "../enums/IPaymentStatus";

export const styles = {
  mainPageStyle:
    "bg-light-grey flex flex-col items-center min-h-screen p-4 pt-[calc(136px_+_24px)]",
  getStatusStyle: (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Pending:
        return "text-warning bg-warning/10 p-2 px-3 rounded-full";
      case PaymentStatus.Paid:
        return "text-success bg-success/10 p-2 px-3 rounded-full";
      case PaymentStatus.Failed:
        return "text-failed bg-failed/10 p-2 px-3 rounded-full";
      default:
        "";
        return;
    }
  },
};

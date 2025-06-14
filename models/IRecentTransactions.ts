import { OrderStatus } from "../enums/IOrderStatus";
import { PaymentStatus } from "../enums/IPaymentStatus";

type IRecentTransactionEvent = {
  title: string;
};

export type IRecentTransactions = {
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  contactNumber: string;
  createdAt: string;
  eventId: string;
  id: string;
  orderId: string;
  orderStatus: OrderStatus;
  paymentId: string;
  paymentStatus: PaymentStatus;
  quantity: number;
  totalPrice: string;
  updatedAt: string;
  userId: string | null;
  event: IRecentTransactionEvent;
};

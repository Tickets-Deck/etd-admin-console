import { OrderStatus } from "../enums/IOrderStatus";
import { PaymentStatus } from "../enums/IPaymentStatus";

export type RecentTransactions = {
  contactEmail: string;
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
};

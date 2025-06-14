import { PaymentServiceProvider } from "@/enums/IPaymentServiceProvider";
import { PaymentStatus } from "@/enums/IPaymentStatus";
import { User } from "./IUser";
import { TicketOrderResponse } from "./ITicketOrder";

export type Payment = {
  id: string;
  userId: string;
  ticketOrderId: string;
  amount: string;
  amountPaid: string | null;
  currency: string | null;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  paymentServiceProvider: PaymentServiceProvider;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;

  user: Pick<User, "id" | "firstName" | "lastName" | "email">;
  ticketOrder: Pick<TicketOrderResponse, "id" | "orderId" | "contactEmail" | "event" | "quantity">;
};
import { PaymentServiceProvider } from "../enums/IPaymentServiceProvider";
import { PaymentStatus } from "../enums/IPaymentStatus";

interface TicketOrderPayment {
  paymentServiceProvider: PaymentServiceProvider;
}

interface TicketOrderEvent {
  title: string;
}

interface SingleTicketOrderUser {
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
}

export interface TicketOrderResponse {
  id: string;
  contactEmail: string;
  orderId: string;
  totalPrice: string;
  createdAt: string;
  quantity: number;
  paymentStatus: PaymentStatus;
  payments: TicketOrderPayment[];
  event: TicketOrderEvent;
}

export interface SingleTicketOrder {
  id: string;
  orderId: string;
  eventName: string;
  tickets: string[];
  user: SingleTicketOrderUser | null;
  contactEmail: string;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactNumber: string | null;
}

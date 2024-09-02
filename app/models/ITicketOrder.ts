import { OrderStatus } from "../enums/IOrderStatus";
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

interface SingleTicketOrderOrderedTicketTicket {
  name: string;
}

interface SingleTicketOrderOrderedTicket {
  ticket: SingleTicketOrderOrderedTicketTicket;
}

export interface FetchSingleTicketOrderRequest {
  userId: string;
  orderId: string;
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
  userId: string;
  event: TicketOrderEvent;
  quantity: number;
  totalPrice: string;
  contactEmail: string;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactNumber: string | null;
  orderId: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  tickets: SingleTicketOrderOrderedTicket[];
  user: SingleTicketOrderUser | null;
}

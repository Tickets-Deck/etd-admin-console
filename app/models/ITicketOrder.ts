import { OrderStatus } from "../enums/IOrderStatus";
import { PaymentStatus } from "../enums/IPaymentStatus";
import { Event } from "./IEvent";

export interface TicketOrder {
    id: string;
    userId: string;
    eventId: string;
    quantity: number;
    totalPrice: string;
    contactEmail: string;
    orderId: string;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentId: string;
    createdAt: string;
    updatedAt: string;
    event: Event;
  }
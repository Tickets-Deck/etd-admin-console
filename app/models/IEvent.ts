export type EventTicket = {
  name: string;
};

export type EventResponse = {
  id: string;
  title: string;
  date: Date;
  time: string;
  revenue: number;
  eventId: string;
  numberOfTicketOrders: number;
  numberOfCouponCodes: number;
  numberOfTickets: number;
};

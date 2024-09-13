export type EventTicket = {
  name: string;
};

export type EventResponse = {
  id: string;
  title: string;
  eventId: string;
  numberOfTicketOrders: number;
  numberOfCouponCodes: number;
  numberOfTickets: number;
};

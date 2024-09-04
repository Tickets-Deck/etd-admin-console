export type EventTicket = {
  name: string;
};

export type EventResponse = {
  id: string;
  title: string;
  eventId: string;
  ticketOrdersCount: number;
  tickets: EventTicket[];
};

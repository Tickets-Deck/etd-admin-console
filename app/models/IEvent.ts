import { EventVisibility } from "../enums/IEventVisibility";

export type Event = {
  id: string;
  eventId: string;
  publisherId: string;
  title: string;
  description: string;
  locationId: string | null;
  venue: string;
  date: string;
  time: string;
  category: string;
  visibility: EventVisibility;
  mainImageUrl: string;
  mainImageId: string;
  currency: string;
  purchaseStartDate: string;
  purchaseEndDate: string;
  allowedGuestType: string;
  bookmarksCount: number;
  favoritesCount: number;
  ticketOrdersCount: number;
  createdAt: string;
  updatedAt: string;
};

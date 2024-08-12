import { PaymentServiceProvider } from "../enums/IPaymentServiceProvider";
import { PaymentStatus } from "../enums/IPaymentStatus";
import { User } from "./IUser";

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

  user: User | null;
  ticketOrder: {
    id: "bf63e383-aa8c-4e9e-8d9c-8a989d1eebd9";
    userId: "a580a06d-754d-4c30-97b6-37de37ae0ae3";
    eventId: "e82e2f5a-1dbf-448c-aa89-67732e936fa0";
    quantity: 1;
    totalPrice: "50000";
    contactEmail: "tobyawo@gmail.com";
    orderId: "TVRAW3LNO5";
    orderStatus: "Confirmed";
    paymentStatus: "Paid";
    paymentId: "008a76c4-e444-4385-9629-aeedd4f99b2a";
    createdAt: "2024-07-15T17:02:19.638Z";
    updatedAt: "2024-07-15T17:07:06.219Z";
    event: {
      id: "e82e2f5a-1dbf-448c-aa89-67732e936fa0";
      eventId: "QTZURU";
      publisherId: "adefe0f8-6a46-49cb-a571-2dc8b59ea830";
      title: "No Gree! for any baga!";
      description: "<p>NO GREE!</p><p>For any baga!</p><p>(Ola Rotimi's grip am reloaded)</p>";
      locationId: null;
      venue: "Agip Hall, MUSON centre";
      date: "2024-10-10T23:00:00.000Z";
      time: "3PM";
      category: "Arts and culture";
      visibility: "PUBLIC";
      mainImageUrl: "https://res.cloudinary.com/dvxqk1487/image/upload/v1721061650/event_images/ct7crmajeedcfseumsui.jpg";
      mainImageId: "event_images/ct7crmajeedcfseumsui";
      currency: "NGN";
      purchaseStartDate: "2024-07-14T23:00:00.000Z";
      purchaseEndDate: "2024-10-10T23:00:00.000Z";
      allowedGuestType: "Everyone";
      bookmarksCount: 0;
      favoritesCount: 0;
      ticketOrdersCount: 5;
      createdAt: "2024-07-15T16:40:50.998Z";
      updatedAt: "2024-07-16T14:46:55.385Z";
    };
  };
};

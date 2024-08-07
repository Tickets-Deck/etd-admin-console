/**
 * The API routes endpoints
 */
export class ApiRoutes {
  /**
   * The dev base url for the application
   */
  static BASE_URL_DEV: string = "http://localhost:9020/";
  //   static BASE_URL_DEV: string = "http://192.168.1.226:9020/";

  /**
   * The test base url for the application
   */
  static BASE_URL_TEST: string = "https://consoletest.events.ticketsdeck.com/";

  /**
   * The live base url for the application
   */
  static BASE_URL_LIVE: string = "https://console.events.ticketsdeck.com";

  /**
   * The route to CreateNewsletterSubscriber endpoint
   */
  static CreateNewsletterSubscriber: string = "api/newsletter-subscriber";

  /**
   * The route to Events endpoint
   */
  static Events: string = "api/events";

  /**
   * The route to Orders endpoint
   */
  static Orders: string = "api/events/orders";

  /**
   * The route to Users endpoint
   */
  static Users: string = "api/users";

  /**
   * The route to TicketOrder endpoint
   */
  static TicketOrder: string = "api/events/tickets/order";

  /**
   * The route to User TicketOrder endpoint
   */
  static UserTicketOrder: string = "api/users/tickets";

  /**
   * The route to Payment endpoint
   */
  static Payment: string = "api/events/tickets/payment";

  /**
   * The route to Tickets endpoint
   */
  static Tickets: string = "api/events/tickets";

  /**
   * The route to Fetch dashboard KPIs endpoint
   */
  static FetchDashboardKpis: string = "api/dashboard";

  /**
   * The route to Fetch recent trasactions endpoint
   */
  static FetchRecentTransactions: string = "api/dashboard/recent-transactions";

  /**
   * The route to Customer Enquiries endpoint
   */
  static CustomerEnquiries: string = "api/customer-enquiries";

  /**
   * The route to Like Event endpoint
   */
  static LikeEvent: string = "api/events/like";

  /**
   * The route to Request User Password Reset Link endpoint
   */
  static UserPasswordResetLink: string =
    "api/users/password/request-reset-link";

  /**
   * The route to User Wallet Balance endpoint
   */
  static UserWalletBalance: string = "api/users/wallet-balance";

  /**
   * The route to User Favorite Events endpoint
   */
  static UserFavoriteEvents: string = "api/events/favourites";
}

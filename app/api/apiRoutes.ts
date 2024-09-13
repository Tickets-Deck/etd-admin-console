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
   * The route to Fetch dashboard KPIs endpoint
   */
  static FetchDashboardKpis: string = "api/dashboard";

  /**
   * The route to Fetch recent trasactions endpoint
   */
  static FetchRecentTransactions: string = "api/dashboard/recent-transactions";

  /**
   * The route to Payments endpoint
   */
  static Payments: string = "api/payments";

  /**
   * The route to Users endpoint
   */
  static Users: string = "api/users";

  /**
   * The route to Events endpoint
   */
  static Events: string = "api/events";

  /**
   * The route to Ticket Orders endpoint
   */
  static TicketOrders: string = "api/ticket-orders";

  /**
   * The route to Transaction Fees endpoint
   */
  static TransactionFees: string = "api/transaction-fees";

  /**
   * The route to Coupon Codes endpoint
   */
  static CouponCodes: string = "api/coupon";
}

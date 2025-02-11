/**
 * The API routes endpoints
 */
export class ApiRoutes {
  /**
   * The dev base url for the application
   */
  //   static BASE_URL_DEV: string = "http://localhost:9020/";
  static BASE_URL_DEV: string = "http://localhost:3050/";

  /**
   * The test base url for the application
   */
  static BASE_URL_TEST: string = "http://13.60.99.219:3050/";
//   static BASE_URL_TEST: string = "https://consoletest.events.ticketsdeck.com/";

  /**
   * The live base url for the application
   */
  static BASE_URL_LIVE: string = "https://console.events.ticketsdeck.com/";

  /**
   * The base url being used for the application
   */
  static BASE_URL: string = ApiRoutes.BASE_URL_TEST;

  /**
   * The route to Request Credential Token endpoint
   */
  static RequestCredentialToken: string = "auth/request-token";

  /**
   * The route to Login endpoint
   */
  static AdminUserLogin: string = "admin/login";

  /**
   * The route to Login endpoint
   */
  static FetchAdminUser: (id: string) => string = (id: string) => `admin/${id}`;

  /**
   * The route to Verify Admin User Email endpoint
   */
  static VerifyAdminUserEmail: (id: string) => string = (id: string) =>
    `admin/verify-email/${id}`;

  /**
   * The route to Fetch dashboard KPIs endpoint
   */
  static FetchDashboardKpis: string = "dashboard/admin";

  /**
   * The route to Fetch recent trasactions endpoint
   */
  static FetchRecentTransactions: string =
    "admin/dashboard/recent-transactions";

  /**
   * The route to Fetch a single ticket order endpoint
   */
  static FetchSingleTicketOrder: (ticketOrderId: string) => string = (
    ticketOrderId: string
  ) => `admin/${ticketOrderId}/ticket-order`;

  /**
   * The route to Payments endpoint
   */
  static Payments: string = "admin/payments";

  /**
   * The route to Users endpoint
   */
  static Users: string = "admin/users";

  /**
   * The route to Events endpoint
   */
  static Events: string = "admin/events";

  /**
   * The route to Ticket Orders endpoint
   */
  static TicketOrders: string = "admin/ticket-orders";

  /**
   * The route to Transaction Fees endpoint
   */
  static TransactionFees: string = "transaction-fees";

  /**
   * The route to Coupon Codes endpoint
   */
  static CouponCodes: string = "coupons";
}

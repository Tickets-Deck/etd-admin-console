/**
 * Application routes
 */
export class ApplicationRoutes {
  /**
   * The route to the home page
   */
  static readonly Home = "/";
  /**
   * The route to the users page
   */
  static readonly Users = "/users";

  /**
   * The route to the verify email page
   */
  static readonly VerifyEmail = "/auth/verify";

  /**
   * The route to the sign in page
   */
  static readonly SignIn = "/auth/signin";

  /**
   * The route to the sign in page with a redirect
   */
  static readonly SignInRedirect = "api/auth/signin?redirect=true";

  /**
   * The route to the sign up page
   */
  static readonly SignUp = "/auth/signup";

  /**
   * The route to the events page
   */
  static readonly Events = "/events";

  /**
   * The route to the payments page
   */
  static readonly Payments = "/payments";

  /**
   * The route to the settings page
   */
  static readonly Settings = "/settings";

  /**
   * The route to the orders page
   */
  static readonly TicketOrders = "/ticket-orders";

  /**
   * The route to the tickets page
   */
  static readonly Tickets = "/tickets";

  /**
   * The route to the analytics page
   */
  static readonly Analytics = "/analytics";

  /**
   * The route to the payouts page
   */
  static readonly Payouts = "/payouts";

  /**
   * The route to the coupons page
   */
  static readonly Coupons = "/coupons";

  /**
   * The route to the organizer reviews page
   */
  static readonly OrganizerReviews = "/organizer-reviews";

  /**
   * The route to the enquiries page
   */
  static readonly Enquiries = "/enquiries";

  /**
   * The route to the newsletter page
   */
  static readonly Newsletter = "/newsletter";
}

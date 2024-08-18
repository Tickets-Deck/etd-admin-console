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
   * The route to the orders page
   */
  static readonly Orders = "/orders";
}

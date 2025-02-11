import Cookies from "js-cookie";
// import { serialize } from "cookie";
import { NextApiResponse } from "next";

const TOKEN_NAME = "auth_token";
const USER_ID = "user_id";

// Set token in cookies with expiry (e.g., 7 days)
export const setAuthCookies = (token: string, userId: string) => {
  Cookies.set(TOKEN_NAME, token, {
    expires: 7,
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  Cookies.set(USER_ID, userId, {
    expires: 7,
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

// export const setAuthCookies = (res: NextApiResponse, token: string, userId: string) => {
//   res.setHeader("Set-Cookie", [
//     serialize("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60, // 7 days
//       path: "/",
//     }),
//     serialize("user_id", userId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     }),
//   ]);
// };

// Get token from cookies
export const getAuthToken = () => Cookies.get(TOKEN_NAME);
export const getUserId = () => Cookies.get(USER_ID);

// Remove token from cookies (logout)
export const removeAuthCookies = () => {
  Cookies.remove(TOKEN_NAME);
  Cookies.remove(USER_ID);
};

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import { StorageKeys } from "@/constants/storageKeys";
import { ApiRoutes } from "@/app/api/apiRoutes";
import { useRequestCredentialToken } from "@/app/api/apiClient";
import { ApplicationError } from "@/constants/applicationError";

// Request token
const requestToken = useRequestCredentialToken();

const API_BASE_URL = ApiRoutes.BASE_URL;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Set max age to 50 minutes
    maxAge: 50 * 60,  // 3000 seconds (50 minutes)
    // Update JWT every 35 minutes
    updateAge: 35 * 60, // 2100 seconds (35 minutes)
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // If email or password is missing, return null to display an error
        if (!credentials?.email || !credentials.password) {
          // Throw an error to display an error message
          throw new Error("Please provide email and password");
        }

        const token = await requestToken();
        console.log("🚀 ~ authorize ~ token:", token)

        // Call your API to login user
        const res = await fetch(`${API_BASE_URL}${ApiRoutes.AdminUserLogin}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data.token || ""}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            credentials: "include", // allow cookies to be sent
          },
          body: JSON.stringify(credentials),
        });

        // Get the response
        const loginResponse = await res.json();
        console.log("🚀 ~ authorize ~ loginResponse:", loginResponse)

        if (
          loginResponse?.errorCode === ApplicationError.InvalidCredentials.Code
        ) {
          throw new Error(ApplicationError.InvalidCredentials.Text);
        }

        if (!res.ok) throw new Error("Invalid credentials");

        if (loginResponse?.token) {
          // Return login response object to be stored in JWT
          return { ...loginResponse };
        }
        return null;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {

        // If user exists, return true to allow sign in
        // if (user) {
        //   return true; // Return true to allow sign in
        // }

        // If user does not exist, create user...

        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return process.env.NEXTAUTH_URL as string;
    },
    // Create and manage JWTs here
    jwt: async ({ token, user, trigger, session }) => {
      // If user is defined, it's a fresh login, so update the token
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: user.token,
        };
      }

      // Return user info so it will be accessible in the session
      return {
        ...token,
        id: token.id,
        token: token.accessToken,
      };
    },
    // Create and manage sessions here
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          token: token.token,
        },
      };
    },
  },
  events: {
    async signIn(message) {
    },
    async signOut(message) {
      // Delete the session cookie
      await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    // async createUser(message) {
    // },
    // async linkAccount(message) {
    // },
    // async session(message) {
    // },
  },
  pages: {
    signIn: ApplicationRoutes.SignIn,
  },
};

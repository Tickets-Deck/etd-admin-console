import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ApplicationRoutes } from "./app/constants/applicationRoutes";
import { StorageKeys } from "./app/constants/storageKeys";
import { prisma } from "./lib/prisma";
import { ApiRoutes } from "./app/api/apiRoutes";
import { useRequestCredentialToken } from "./app/api/apiClient";
import { ApplicationError } from "./app/constants/applicationError";

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
      name: "Sign in",
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
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`, // Make sure this matches the URI in the Google Developer Console
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      // console.log("Sign In Callback", { account, profile });

      if (account?.provider === "google") {
        // Check if user exists in database checking each user's email if it matches the email provided
        const user = await prisma.adminUsers.findUnique({
          where: {
            email: profile?.email,
          },
        });

        // If user exists, return true to allow sign in
        if (user) {
          // Update emailVerified to true
          await prisma.adminUsers.update({
            where: {
              id: user.id,
            },
            data: {
              emailVerified: true,
            },
          });

          return true; // Return true to allow sign in
        }

        // If user does not exist, create user
        await prisma.adminUsers.create({
          data: {
            email: profile?.email as string,
            firstName: profile?.name?.split(" ")[0] as string,
            lastName: profile?.name?.split(" ")[1] as string,
            password: "google-signup-no-password",
            profilePhoto: profile?.picture as string,
            emailVerified: true,
          },
        });

        // Send email to the subscriber
        // await sendMail({
        //   to: profile?.email as string,
        //   name: "Account Created",
        //   subject: "Welcome to Ticketsdeck",
        //   body: compileAccountCreationTemplate(
        //     `${profile?.name?.split(" ")[0]} ${profile?.name?.split(" ")[1]}`
        //   ),
        // });

        return true; // Return true to allow sign in
      }
      return true; // Return true to allow sign in
    },
    async redirect({ url, baseUrl }) {
      return process.env.NEXTAUTH_URL as string;
    },
    // Create and manage JWTs here
    jwt: async ({ token, user, trigger, session }) => {
      //   console.log("JWT Callback", { token, user, trigger, session });

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
      console.log("Session Callback", { session, token });

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
      //   console.log("Sign In Event", { message });
    },
    async signOut(message) {
      // Delete the session cookie
      await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Delete the new user email from session storage
      sessionStorage.removeItem(StorageKeys.NewlyCreatedUserEmail);

      // console.log("Sign Out Event", { message });
    },
    // async createUser(message) {
    //   console.log("Create User Event", { message });
    // },
    // async linkAccount(message) {
    //   console.log("Link Account Event", { message });
    // },
    // async session(message) {
    //   console.log("Session Event", { message });
    // },
  },
  pages: {
    signIn: ApplicationRoutes.SignIn,
  },
};

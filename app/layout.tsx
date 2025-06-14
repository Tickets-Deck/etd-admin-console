import type { Metadata } from "next";
import "./globals.css";
import "./globals.scss";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import GlobalProvider from "@/components/Provider";
import { authOptions } from '@/auth';
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Ticketsdeck Events Console",
  description: "Console application for the ticketsdeck events application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="light">
      <body className={`antialiased`}>
        <GlobalProvider>
          <LayoutWrapper session={session}>{children}</LayoutWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}

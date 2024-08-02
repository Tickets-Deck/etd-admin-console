import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Layout from "./shared/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from '@/auth';
import GlobalProvider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ticketsdeck Events Admin Console",
    description: "The admin console for Ticketsdeck Events.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="bg-white">
                <GlobalProvider>
                    <Layout
                        children={children}
                        session={session}
                    />
                </GlobalProvider>
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Layout from "./shared/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from '@/auth';
import GlobalProvider from "./components/Provider";
import { initializeIcons, loadTheme } from "@fluentui/react";


export const metadata: Metadata = {
    title: "Ticketsdeck Events Admin Console",
    description: "The admin console for Ticketsdeck Events.",
};


// Load fluent UI icons
loadTheme({
    palette: {
        themePrimary: '#8133f1',
        themeLighterAlt: '#fef9f6',
        themeLighter: '#fde5db',
        themeLight: '#fbcfbd',
        themeTertiary: '#f7a17c',
        themeSecondary: '#f47742',
        themeDarkAlt: '#da5b25',
        themeDark: '#b84d1f',
        themeDarker: '#883917',
        neutralLighterAlt: '#faf9f8',
        neutralLighter: '#f3f2f1',
        neutralLight: '#edebe9',
        neutralQuaternaryAlt: '#e1dfdd',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c6c4',
        neutralTertiary: '#a19f9d',
        neutralSecondary: '#605e5c',
        neutralSecondaryAlt: '#8a8886',
        neutralPrimaryAlt: '#3b3a39',
        neutralPrimary: '#323130',
        neutralDark: '#201f1e',
        black: '#000000',
        white: '#ffffff',
    },
    defaultFontStyle: { fontFamily: 'MonaSans' }
});

// Initialize icons
initializeIcons(undefined, {
    disableWarnings: true,
});

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

"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProvider } from '@/contexts/ApplicationContext';
import { EventContextProvider } from '@/contexts/EventContext';

type Props = {
    children?: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <AppProvider>
                <EventContextProvider>
                    {children}
                </EventContextProvider>
            </AppProvider>
        </SessionProvider >
    );
};

export default GlobalProvider;
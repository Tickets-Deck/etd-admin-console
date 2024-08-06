"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProvider } from '../contexts/ApplicationContext';

type Props = {
    children?: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </SessionProvider>
    );
};

export default GlobalProvider;
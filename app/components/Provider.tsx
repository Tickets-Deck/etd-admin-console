"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';

// const store = configureStore({
//     reducer: {
//         userCredentials: userReducer,
//         theme: themeReducer,
//     },
// });

type Props = {
    children?: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default GlobalProvider;
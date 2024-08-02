"use client"
import NextTopLoader from "nextjs-toploader";
import React, { FunctionComponent, ReactElement, ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { Session } from "next-auth";
import { useRouter, usePathname } from "next/navigation";
import { ApplicationRoutes } from "../constants/applicationRoutes";

interface LayoutProps {
    children?: ReactNode;
    session: Session | null
}

const Layout: FunctionComponent<LayoutProps> = ({ children, session }): ReactElement => {

    const { push } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!session) {
            push(ApplicationRoutes.SignIn);
        }
    }, [session])

    return (
        <>
            <NextTopLoader
                color="#5419a7"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #f1fa9e,0 0 5px #ceb0fa"
            />
            {
                pathname !== ApplicationRoutes.SignIn &&
                <Navbar
                    session={session}
                />
            }
            {children}
        </>
    );
}

export default Layout;
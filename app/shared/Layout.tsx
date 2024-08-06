"use client"
import NextTopLoader from "nextjs-toploader";
import React, { FunctionComponent, ReactElement, ReactNode, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Session } from "next-auth";
import { useRouter, usePathname } from "next/navigation";
import { ApplicationRoutes } from "../constants/applicationRoutes";
import OfflineAlert from "../components/Modal/OfflineAlert";
import { useOnline } from "../hooks/useOnline";
import { ApplicationContext, ApplicationContextData } from "../contexts/ApplicationContext";

interface LayoutProps {
    children?: ReactNode;
    session: Session | null
}

const Layout: FunctionComponent<LayoutProps> = ({ children, session }): ReactElement => {

    const { push } = useRouter();
    const pathname = usePathname();
    const { offlineStatusModalVisibility, hideOfflineStatusModalVisibility } = useContext(ApplicationContext) as ApplicationContextData;
    console.log("🚀 ~ offlineStatusModalVisibility:", offlineStatusModalVisibility)

    useEffect(() => {
        if (!session) {
            push(ApplicationRoutes.SignIn);
        }
    }, [session])

    return (
        <>
            <OfflineAlert
                visibility={offlineStatusModalVisibility}
                setVisibility={hideOfflineStatusModalVisibility}
            />
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
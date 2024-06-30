import NextTopLoader from "nextjs-toploader";
import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import Navbar from "./Navbar";
import { Session } from "next-auth";

interface LayoutProps {
    children?: ReactNode;
    session: Session | null
}

const Layout: FunctionComponent<LayoutProps> = ({ children, session }): ReactElement => {
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
            <Navbar
                session={session}
            />
            {children}
        </>
    );
}

export default Layout;
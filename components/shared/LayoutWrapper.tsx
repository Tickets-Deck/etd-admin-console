"use client"
import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NextTopLoader from "nextjs-toploader";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import { isTokenExpired } from "@/utils/getTokenExpirationStatus";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import OfflineAlert from "../modal/OfflineAlert";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function LayoutWrapper({ children, session }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { offlineStatusModalVisibility, hideOfflineStatusModalVisibility } =
    useApplicationContext();

  useEffect(() => {
    if (!session || isTokenExpired(session.user.token as string)) {
      push(ApplicationRoutes.SignIn);
    }
  }, [session]);

  if (pathname == ApplicationRoutes.SignIn) {
    return (
      <>
        <OfflineAlert
          visibility={offlineStatusModalVisibility}
          setVisibility={hideOfflineStatusModalVisibility}
        />
        {children}
      </>
    );
  }
  
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
      <main className="flex flex-row h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          {children}
        </div>
      </main>
    </>
  );
}

"use client"
import { Icons } from "../components/ui/icons";
import { ReactElement, FunctionComponent, useState, useEffect } from "react";
import { DashboardInfoResponse } from "../models/IDashboardInfoResponse";
import { ApplicationRoutes } from "../constants/applicationRoutes";
import { useFetchDashboardInfo, useFetchRecentTransactions } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import Kpi from "./Kpi";
import RecentTransactions from "./RecentTransactions";
import { IRecentTransactions } from "../models/IRecentTransactions";
import { FullPageLoader } from "../components/Loader/ComponentLoader";
import { useApplicationContext } from "../contexts/ApplicationContext";

type HomepageProps = {
}

const Homepage: FunctionComponent<HomepageProps> = (): ReactElement => {

    const fetchDashboardInfo = useFetchDashboardInfo();
    const fetchRecentTransactions = useFetchRecentTransactions();
    const { adminUser, handleFetchAdminUser } = useApplicationContext();

    // console.log("🚀 ~ adminUser:", adminUser);
    // useEffect(() => {
    //     console.log("Setting cookies...");
    //     setAuthCookies("test_token_123", "user_456");

    //     setTimeout(() => {
    //       console.log("Getting cookies...");
    //       console.log("Token:", getAuthToken());
    //       console.log("User ID:", getUserId());

    //       console.log("Removing cookies...");
    //       removeAuthCookies();

    //       console.log("Token after removal:", getAuthToken());
    //       console.log("User ID after removal:", getUserId());
    //     }, 2000);
    //   }, []);

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = useState(true);
    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfoResponse>();
    const [recentTransactions, setRecentTransactions] = useState<IRecentTransactions[]>();

    useEffect(() => {
        if (!user) return;
        handleFetchAdminUser();
    }, [user])

    // Store token in cookies
    // useEffect(() => {
    //     if (user?.token && user?.id) {
    //         console.log("🚀 ~ useEffect ~ user:", user)
    //         setAuthCookies(user.token, user.id);
    //     }
    // }, [session, user]);

    async function handleFetchDashboardInfo() {

        // Start loader
        setIsLoading(true);

        await fetchDashboardInfo(user?.token as string)
            .then((response) => {
                setDashboardInfo(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    async function handleFetchRecentTransactions() {
        await fetchRecentTransactions(user?.token as string)
            .then((response) => {
                // console.log(response.data);
                setRecentTransactions(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
    }

    useEffect(() => {
        if (!user) return;
        handleFetchDashboardInfo();
        handleFetchRecentTransactions();
    }, [user])

    return (
        <main className="bg-light-grey flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(136px_+_24px)]">
            {
                recentTransactions ?
                    <>
                        <div className="w-full flex flex-col gap-4 mb-8 md:flex-row">
                            <Kpi
                                path={ApplicationRoutes.Users}
                                title="Total Users"
                                icon={<Icons.UserOutline className="w-6 h-6" />}
                                value={dashboardInfo?.totalUsers.toString() || "0"}
                            />
                            <Kpi
                                path={ApplicationRoutes.Payments}
                                title="Total Payments"
                                icon={<Icons.PaymentOutline className="w-6 h-6" />}
                                value={dashboardInfo?.totalRevenue.toLocaleString() || "0"}
                                priceKpi
                            />
                            <Kpi
                                path={ApplicationRoutes.Events}
                                title="Total Events"
                                icon={<Icons.EventsOutline className="w-6 h-6" />}
                                value={dashboardInfo?.totalEvents.toString() || "0"}
                            />
                        </div>

                        <RecentTransactions
                            recentTransactions={recentTransactions}
                        />
                    </> :
                    <FullPageLoader />
            }
        </main>
    );
}

export default Homepage;
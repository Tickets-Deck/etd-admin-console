"use client"
import Button from "../components/ui/button";
import { Icons } from "../components/ui/icons";
import Link from "next/link";
import { ReactElement, FunctionComponent, useState, useEffect } from "react";
import { DashboardInfoResponse } from "../models/IDashboardInfoResponse";
import { ApplicationRoutes } from "../constants/applicationRoutes";
import { useFetchDashboardInfo, useFetchRecentTransactions } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import moment from "moment";
import { RecentTransactions } from "../models/IRecentTransactions";

type HomepageProps = {
}

const Homepage: FunctionComponent<HomepageProps> = (): ReactElement => {

    const fetchDashboardInfo = useFetchDashboardInfo();
    const fetchRecentTransactions = useFetchRecentTransactions();
    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = useState(true);
    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfoResponse>();
    const [recentTransactions, setRecentTransactions] = useState<RecentTransactions[]>([]);

    async function handleFetchDashboardInfo() {

        // Start loader
        setIsLoading(true);

        await fetchDashboardInfo(user?.id as string)
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
        await fetchRecentTransactions(user?.id as string)
            .then((response) => {
                console.log(response.data);
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

            <div className="w-full flex flex-col gap-4 bg-white p-5 rounded-2xl">
                <div className="flex flex-col items-start md:flex-row md:justify-between">
                    <h3 className="text-xl font-medium">Recent Transactions</h3>
                    <Link href="/" className="font-normal text-dark-grey/50 md:p-2 md:px-4 md:rounded-full md:bg-dark-grey md:text-white">See all</Link>
                </div>
                <ul className="mb-5">
                    {
                        recentTransactions.map((transaction, index) => {
                            return (
                                <li className="flex flex-col py-3 gap-5 border-b-[1px] border-dark-grey/15 last:border-none last:pb-0" key={index}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span className="w-10 h-10 rounded-md bg-green-100/50 grid place-items-center">
                                            <Icons.Credit className="w-8 h-8 stroke-dark-grey" />
                                        </span>
                                        <div className="flex flex-col">
                                            <h4 className="font-normal text-lg leading-6">Samson bought a ticket</h4>
                                            <div className="flex flex-row gap-2">
                                                <p className="text-sm text-dark-grey/50">{moment(transaction.createdAt).format("MMM D, YYYY")}</p>
                                                <p className="text-sm text-dark-grey/50">{moment(transaction.createdAt).format("hh:mma")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <span className="font-semibold text-xl text-dark-grey font-MonaSansWide">
                                            {
                                                Number(transaction.totalPrice) > 0 ?
                                                <>&#8358;{Number(transaction.totalPrice).toLocaleString()}</> :
                                                <>Free</>
                                            }
                                        </span>
                                        <Link href="/" className="p-2 px-5 bg-gray-100 text-dark-grey/80 text-sm rounded-full hover:opacity-55">View transaction</Link>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <Button className="w-fit mx-auto">See all</Button>
            </div>
        </main>
    );
}

export default Homepage;


type Kpi = {
    icon: JSX.Element;
    title: string;
    value: string;
    path: string;
    priceKpi?: boolean;
}

const Kpi = ({ path, icon, title, value, priceKpi }: Kpi) => {
    return (
        <Link href={path} className="bg-white w-full rounded-2xl p-5 flex flex-col focus:shadow-lg focus:shadow-gray-200">
            <span className="w-12 h-12 bg-primary/10 grid place-items-center rounded-lg mb-6">
                {icon}
            </span>
            <h3 className="font-semibold text-lg text-dark-grey/50">{title}</h3>
            <p className="font-semibold text-3xl text-primary font-MonaSansWide">
                {priceKpi && <>&#8358;</>}
                {value}
            </p>
        </Link>
    )
}
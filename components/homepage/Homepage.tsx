"use client";

import TicketStatusChart from "@/components/homepage/TicketStatusChart";
import MetricCard from "@/components/homepage/MetricCard";
import QuickAccessCard from "@/components/homepage/QuickAccessCard";
import WeeklyIncomeChart from "@/components/homepage/WeeklyIncomeChart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon, ExpandIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { moveMessagePortToContext } from "worker_threads";
import { TicketSalesOverview } from "./TicketSalesOverview";
import { RecentSales } from "./RecentSales";
import { StorageKeys } from "@/constants/storageKeys";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import { DashboardInfoResponse } from "@/models/IDashboardInfoResponse";
import { catchError } from "@/constants/catchError";
import {
  useFetchDashboardInfo,
  useFetchRecentTransactions,
} from "@/app/api/apiClient";
import { useSession } from "next-auth/react";
import { IRecentTransactions } from "@/models/IRecentTransactions";
import Loader from "../ui/loader";
import { NairaPrice } from "@/constants/priceFormatter";

export default function Homepage() {
  const fetchDashboardInfo = useFetchDashboardInfo();
  const fetchRecentTransactions = useFetchRecentTransactions();
  const { data: session, status } = useSession();

  const user = session?.user;
  const [lastLoggedInTime, setLastLoggedInTime] = useState<Date>(new Date());
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfoResponse>();
  const [recentTransactions, setRecentTransactions] =
    useState<IRecentTransactions[]>();

  const [isFetchingDashboardInfo, setIsFetchingDashboardInfo] = useState(true);
  const [isFetchingRecentTransactions, setIsFetchingRecentTransactions] =
    useState(true);

  async function handleFetchDashboardInfo() {
    // Start loader
    setIsFetchingDashboardInfo(true);

    await fetchDashboardInfo(user?.token as string)
      .then((response) => {
        setDashboardInfo(response.data);
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => {
        setIsFetchingDashboardInfo(false);
      });
  }

  async function handleFetchRecentTransactions() {
    await fetchRecentTransactions(user?.token as string)
      .then((response) => {
        setRecentTransactions(response.data);
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => {
        setIsFetchingRecentTransactions(false);
      });
  }

  const getLastLoggedInTime = () => {
    const lastLoggedInTime = localStorage.getItem(StorageKeys.LastLoginTime);

    if (lastLoggedInTime) {
      const parsedTime = new Date(lastLoggedInTime);
      if (!isNaN(parsedTime.getTime())) {
        setLastLoggedInTime(parsedTime);
      } else {
        console.error("Invalid date format in localStorage");
      }
    }
  };

  useEffect(() => {
    getLastLoggedInTime();
  }, []);

  useEffect(() => {
    if (!user) return;
    handleFetchDashboardInfo();
    handleFetchRecentTransactions();
  }, [user]);

  return (
    <main className="flex-1 overflow-auto p-6 bg-accent">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">
              Hi Sims, what would you like to do today?
            </h1>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Last login:</span>{" "}
              {moment(lastLoggedInTime).format("D/MM/YYYY HH:mm:ss")}
            </p>
          </div>

          {/* <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Calendar1Icon />
                    Today
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={(date) => date && setCurrentDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="text-sm text-muted-foreground">
                {moment(currentDate).format("ddd. MMM yyyy")}
              </span>
            </div>
          </div> */}
        </div>

        <div className="bg-background border-[1px] border-black/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAccessCard
              icon="events"
              title="Manage Events"
              color="blue"
              url={ApplicationRoutes.Events}
            />
            <QuickAccessCard
              icon="users"
              title="Manage Users"
              color="blue"
              url={ApplicationRoutes.Users}
            />
            <QuickAccessCard
              icon="credit-card"
              title="View Payments"
              color="blue"
              url={ApplicationRoutes.Payments}
            />
            <QuickAccessCard
              icon="payouts"
              title="Review Payout Requests"
              color="blue"
              url={ApplicationRoutes.Payouts}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon="credit-card"
              title="Total Revenue"
              value={NairaPrice.format(dashboardInfo?.totalRevenue || 0)}
              change="+9%"
              period="this month"
              trend="up"
              color="blue"
              isLoading={isFetchingDashboardInfo}
            />
            <MetricCard
              icon="active-event"
              title="Active Events"
              value="0"
              change="+8.2%"
              period="this month"
              trend="up"
              color="blue"
              isLoading={isFetchingDashboardInfo}
            />
            <MetricCard
              icon="event"
              title="Total Events"
              value={dashboardInfo?.totalEvents.toLocaleString() ?? "0"}
              change="+24%"
              period="vs yesterday"
              trend="up"
              color="blue"
              isLoading={isFetchingDashboardInfo}
            />
            <MetricCard
              icon="users"
              title="Total Users"
              value={dashboardInfo?.totalUsers.toLocaleString() ?? "0"}
              //   alert="Requires attention"
              change="+4%"
              period="this month"
              trend="up"
              color="orange"
              isLoading={isFetchingDashboardInfo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 shadow-none">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Ticket sales and revenue for the past 30 days
                </p>
              </div>
            </div>
            <TicketSalesOverview />
            {/* <MonthlyIssuanceChart /> */}
          </Card>

          <Card className="p-4 shadow-none">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">Recent Sales</h3>
                <p className="text-sm text-muted-foreground">
                  Latest ticket purchases across all events
                </p>
              </div>
              {/* <Button variant="ghost" size="icon">
                <ExpandIcon />
              </Button> */}
            </div>
            {/* <RecentCardRequests /> */}
            {isFetchingRecentTransactions ? (
              <Loader />
            ) : recentTransactions && recentTransactions.length > 0 ? (
              <RecentSales recentTransactions={recentTransactions} />
            ) : (
              <p className="text-center text-muted-foreground">
                No recent transactions found.
              </p>
            )}
          </Card>

          <Card className="p-4 shadow-none">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">This Week's Income</h3>
            </div>
            <WeeklyIncomeChart />
          </Card>

          <Card className="p-4 shadow-none">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Tickets Status Distribution
              </h3>
            </div>
            <TicketStatusChart />
          </Card>
        </div>
      </div>
    </main>
  );
}

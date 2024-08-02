import Button from "./components/ui/button";
import { Icons } from "./components/ui/icons";
import Link from "next/link";
import { ApplicationRoutes } from "./constants/applicationRoutes";

export default function Home() {

    const kpis = [
        {
            icon: <Icons.UserOutline className="w-6 h-6" />,
            title: "Total Users",
            value: "100",
            path: ApplicationRoutes.Users
        },
        {
            icon: <Icons.PaymentOutline className="w-6 h-6" />,
            title: "Total Payments",
            value: "2054000",
            path: ApplicationRoutes.Payments
        },
        {
            icon: <Icons.EventsOutline className="w-6 h-6" />,
            title: "Total Events",
            value: "35",
            path: ApplicationRoutes.Events
        }
    ]

    return (
        <main className="bg-light-grey flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(136px_+_24px)]">
            <div className="w-full flex flex-col gap-4 mb-8 md:flex-row">
                {
                    kpis.map((kpi, index) => {
                        const priceKpi = kpi.title == "Total Payments";

                        if (priceKpi) {
                            kpi.value = Number(kpi.value).toLocaleString();
                        };

                        return (
                            <Link href={kpi.path} className="bg-white w-full rounded-2xl p-5 flex flex-col focus:shadow-lg focus:shadow-gray-200" key={index}>
                                <span className="w-12 h-12 bg-primary/10 grid place-items-center rounded-lg mb-6">
                                    {kpi.icon}
                                </span>
                                <h3 className="font-semibold text-lg text-dark-grey/50">{kpi.title}</h3>
                                <p className="font-semibold text-3xl text-primary font-MonaSansWide">
                                    {priceKpi && <>&#8358;</>}
                                    {kpi.value}
                                </p>
                            </Link>
                        )
                    })
                }
            </div>

            <div className="w-full flex flex-col gap-4 bg-white p-5 rounded-2xl">
                <div className="flex flex-col items-start">
                    <h3 className="text-xl font-medium">Recent Transactions</h3>
                    <Link href="/" className="font-normal text-dark-grey/50">See all</Link>
                </div>
                <ul className="mb-5">
                    {
                        [...Array(6)].map((_, index) => {
                            return (
                                <li className="flex flex-col py-3 gap-5 border-b-[1px] border-dark-grey/15 last:border-none last:pb-0" key={index}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span className="w-10 h-10 rounded-md bg-green-100/50 grid place-items-center">
                                            <Icons.Credit className="w-8 h-8 stroke-dark-grey" />
                                        </span>
                                        <div className="flex flex-col">
                                            <h4 className="font-normal text-lg leading-6">Samson bought a ticket</h4>
                                            <div className="flex flex-row gap-2">
                                                <p className="text-sm text-dark-grey/50">Jun 16, 2024</p>
                                                <p className="text-sm text-dark-grey/50">05:27pm</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <span className="font-semibold text-xl text-dark-grey font-MonaSansWide">
                                            {Number(5000).toLocaleString()}
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

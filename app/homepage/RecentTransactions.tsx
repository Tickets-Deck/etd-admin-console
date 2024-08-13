import React from 'react'
import Link from "next/link";
import { ApplicationRoutes } from '../constants/applicationRoutes';
import { Icons } from '../components/ui/icons';
import moment from 'moment';
import Button from '../components/ui/button';
import { RecentTransactions } from '../models/IRecentTransactions';

type Props = {
    recentTransactions: RecentTransactions[]
}

const RecentTransactions = ({ recentTransactions }: Props) => {
    return (
        <div className="w-full flex flex-col gap-4 bg-white p-5 rounded-2xl">
            <div className="flex flex-col items-start md:flex-row md:justify-between">
                <h3 className="text-xl font-medium text-dark-grey">Recent Transactions</h3>
                <Link href={ApplicationRoutes.Payments} className="font-normal text-dark-grey/50 md:p-2 md:px-4 md:rounded-full md:bg-dark-grey md:text-white">
                    See all
                </Link>
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
                                        <h4 className="font-normal text-lg text-dark-grey leading-6">{transaction.contactEmail}</h4>
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="text-sm text-dark-grey/50">{moment(transaction.createdAt).format("MMM D, YYYY")}</p>
                                            <span className="text-dark-grey">|</span>
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
                                    <Button className="p-2 px-5 !bg-gray-100 !text-dark-grey/80 text-sm rounded-full hover:opacity-55">View transaction</Button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <Link href={ApplicationRoutes.Payments} className="w-fit mx-auto">See all</Link>
        </div>
    )
}

export default RecentTransactions
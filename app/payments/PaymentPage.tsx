"use client"
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import Link from "next/link";
import { Icons } from '../components/ui/icons';
import Table from '../components/ui/table';
import { useFetchPayments } from '../api/apiClient';
import { useSession } from "next-auth/react";
import { catchError } from '../constants/catchError';
import { Payment } from '../models/IPayment';
import moment from 'moment';
import { serializer } from '../constants/serializer';
import { PaymentStatus } from '../enums/IPaymentStatus';
import { NairaPrice } from '../constants/priceFormatter';

type Props = {}

const PaymentPage = (props: Props) => {

    const fetchPayments = useFetchPayments();

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);

    async function handleFetchPayments() {

        await fetchPayments(user?.id as string)
            .then((response) => {
                setPayments(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!user) return;
        handleFetchPayments();
    }, [user]);

    return (
        <main className={styles.mainPageStyle}>
            <div className="w-full flex flex-col gap-4 bg-transparent p-0">
                <div className="flex flex-col items-start md:flex-row md:justify-between">
                    <h3 className="text-2xl text-dark-grey font-medium">Payments</h3>
                    {/* <Link href={ApplicationRoutes.Payments} className="font-normal text-dark-grey/50 md:p-2 md:px-4 md:rounded-full md:bg-dark-grey md:text-white">
                        See all
                    </Link> */}
                </div>

                <div className='rounded-2xl overflow-x-auto'>
                    <Table
                        tableHeaderStyle="text-white"
                        tableHeaders={[
                            <div className="flex items-center">
                                {/* <input type="checkbox" className="custom-checkbox" /> */}
                                <span className="ml-2">Contact Email</span>
                            </div>,
                            <>Event name</>,
                            <>Amount</>,
                            <>Reservation Date</>,
                            <>Quantity</>,
                            <>Method</>,
                            <>Status</>,
                            <>Action</>,
                        ]}
                        tableRowsData={
                            payments.map((payment, index) => [
                                <div className="flex items-center text-[#666666]">
                                    {/* <input type="checkbox" className="border border-mcNiff-primary" /> */}
                                    <span className="ml-2 text-sm w-48 text-wrap">{payment.ticketOrder.contactEmail}</span>
                                </div>,
                                <span className="text-[#666666] text-left">{payment.ticketOrder.event.title}</span>,
                                <span className="text-[#666666]">{NairaPrice.format(Number(payment.amount))}</span>, 
                                <span className="text-[#666666] whitespace-nowrap">{moment(payment.createdAt).format("MMM D, YYYY | hh:mma")}</span>,
                                <span className="text-[#666666]">{payment.ticketOrder.quantity}</span>,
                                <span className="text-[#666666]">{payment.paymentServiceProvider}</span>,
                                <span className={styles.getStatusStyle(payment.paymentStatus)}>{serializer.paymentStatus(payment.paymentStatus)}</span>,
                                <div className='flex flex-row gap-1'>
                                    <button className="p-2 px-4 bg-gray-200 text-dark-grey/80 text-xs rounded-full hover:opacity-55">
                                        Confirm
                                    </button>
                                    <button className="p-1 text-dark-grey/80 text-xs hover:opacity-55">
                                        View details
                                    </button>
                                </div>
                            ])
                        }
                        isLoading={isLoading}
                    ></Table>
                </div>
            </div>
        </main>
    )
}

export default PaymentPage
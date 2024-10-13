"use client"
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import Table from '../components/ui/table';
import { useFetchPayments } from '../api/apiClient';
import { useSession } from "next-auth/react";
import { catchError } from '../constants/catchError';
import { Payment } from '../models/IPayment';
import moment from 'moment';
import { serializer } from '../constants/serializer';
import { NairaPrice } from '../constants/priceFormatter';
import { ButtonLoader } from '../components/Loader/ComponentLoader';
import { toast } from "sonner";
import Button from '../components/ui/button';
import { PaymentStatus } from '../enums/IPaymentStatus';
import Input from '../components/ui/input';

type Props = {}

const PaymentPage = (props: Props) => {

    const fetchPayments = useFetchPayments();

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = useState(true);
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
    const [selectedTrxref, setSelectedTrxref] = useState<string>();
    const [payments, setPayments] = useState<Payment[]>();
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>();
    const [searchQuery, setSearchQuery] = useState<string>();
    const [paymentTypeFilter, setPaymentTypeFilter] = useState<string | PaymentStatus>();

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

    async function handleVerifyPayment(trxref: string) {
        setIsVerifyingPayment(true);

        const response = await fetch(`/api/payments/verify?trxref=${trxref}`);
        const data = await response.json();
        console.log("Payment verification data", data);

        if (data?.message == "Payment successfully processed." || data?.status == 'success') {
            toast.success("Payment was successful.");
            postVerifyPayment();
            return;
        }
        if (data?.status == 'abandoned' || data?.status == 'ongoing' || data?.status == 'pending') {
            toast.error("Payment still pending.");
            postVerifyPayment();
            return;
        }
        if (data?.status == 'failed') {
            toast.error("Payment failed.");
            postVerifyPayment();
            return;
        }

        toast.error("Payment could not be verified.");
        postVerifyPayment();

        function postVerifyPayment() {
            setIsVerifyingPayment(false);
            handleFetchPayments();
        }
    }

    useEffect(() => {
        if (!user) return;
        handleFetchPayments();
    }, [user]);

    useEffect(() => {
        if (searchQuery && payments) {
            let _filterResults = [];

            _filterResults = payments?.filter(payment =>
                [payment.user?.email.toLowerCase() ?? '', payment.ticketOrder.event.title.toLowerCase()]
                    .some(
                        anyPropValue => anyPropValue.startsWith(searchQuery.toLowerCase()) ||
                            anyPropValue.includes(searchQuery.toLowerCase())
                    )).filter(payment => paymentTypeFilter ? payment.paymentStatus == paymentTypeFilter : payment) ??
                [];

            setFilteredPayments(_filterResults);
        } else {
            setFilteredPayments(undefined);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!paymentTypeFilter) return;

        const filterPayments = (status: PaymentStatus) => {
            return (filteredPayments || payments)?.filter(payment =>
                payment.paymentStatus === status &&
                (searchQuery ?
                    payment.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    payment.ticketOrder.event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    : true)
            );
        };

        let _filterResults = filteredPayments;

        switch (paymentTypeFilter) {
            case PaymentStatus.Paid:
                _filterResults = filterPayments(PaymentStatus.Paid);
                break;
            case PaymentStatus.Pending:
                _filterResults = filterPayments(PaymentStatus.Pending);
                break;
            case PaymentStatus.Failed:
                _filterResults = filterPayments(PaymentStatus.Failed);
                break;

            default:
                _filterResults = payments?.filter(payment =>
                (searchQuery ?
                    payment.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    payment.ticketOrder.event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    : true)
                );;
                break;
        }

        setFilteredPayments(_filterResults);
    }, [paymentTypeFilter])

    return (
        <main className={styles.mainPageStyle}>
            <div className="w-full flex flex-col gap-4 bg-transparent p-0">
                <div className="flex flex-row items-start justify-between w-full mb-4 mt-6">
                    <h3 className="text-2xl text-dark-grey font-medium">Payments</h3>

                    <div className='flex flex-row items-start gap-3'>
                        <select
                            onChange={(e) => {
                                setFilteredPayments(undefined);
                                setPaymentTypeFilter(e.target.value)
                            }}
                            className='text-dark-grey p-2 px-3 rounded-lg'>
                            <option className='p-2 bg-white' value={undefined}>All payments</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Pending}>Pending</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Paid}>Paid</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Failed}>Failed</option>
                        </select>

                        <div className="text-dark-grey">
                            <Input
                                placeholder="Search for an event"
                                className="p-2 px-3 rounded-md mb-1"
                                onChange={(e) => {
                                    if (e.target.value == '') {
                                        setFilteredPayments(undefined);
                                        setPaymentTypeFilter(undefined);
                                    }
                                    setSearchQuery(e.target.value)
                                }}
                            />
                            <p className="text-sm text-dark-grey/50">Search using user email, or event name</p>
                        </div>
                    </div>
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
                            (filteredPayments || payments)?.map((payment, index) => [
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
                                    {
                                        payment.paymentStatus === PaymentStatus.Pending &&
                                        <Button
                                            disabled={isVerifyingPayment}
                                            isLoading={isVerifyingPayment && payment.paymentReference == selectedTrxref}
                                            onClick={() => {
                                                setSelectedTrxref(payment.paymentReference);
                                                handleVerifyPayment(payment.paymentReference)
                                            }}
                                            className="!p-2 !px-4 !bg-gray-200 !text-dark-grey/80 !text-xs !rounded-full !hover:opacity-55 transition-all">
                                            Confirm
                                            {/* {isLoading && <ButtonLoader />} */}
                                        </Button>
                                    }
                                    {/* <button className="p-1 text-dark-grey/80 text-xs ml-auto mr-3 hover:opacity-55">
                                        View details
                                    </button> */}
                                </div>
                            ]) ?? []
                        }
                        isLoading={isLoading}
                    ></Table>
                </div>
            </div>
        </main>
    )
}

export default PaymentPage
"use client"
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { styles } from "../styles/styles";
import Table from "../components/ui/table";
import { useFetchTicketOrder, useFetchTicketOrders } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import { FetchSingleTicketOrderRequest, SingleTicketOrder, TicketOrderResponse } from "../models/ITicketOrder";
import { NairaPrice } from "../constants/priceFormatter";
import moment from "moment";
import { serializer } from "../constants/serializer";
import OrderDetails from "../components/Modal/OrderDetails";
import { PaymentStatus } from "../enums/IPaymentStatus";
import Input from "../components/ui/input";

interface OrdersPageProps {

}

const OrdersPage: FunctionComponent<OrdersPageProps> = (): ReactElement => {

    const fetchTicketOrders = useFetchTicketOrders();
    const fetchTicketOrder = useFetchTicketOrder();

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingSingleTicketOrder, setIsFetchingSingleTicketOrder] = useState(false);
    const [ticketOrders, setTicketOrders] = useState<TicketOrderResponse[]>();
    const [ticketOrder, setTicketOrder] = useState<SingleTicketOrder | null>(null);
    const [selectedTicketOrderId, setSelectedTicketOrderId] = useState<string>();
    const [filteredOrders, setFilteredOrders] = useState<TicketOrderResponse[]>();
    const [searchQuery, setSearchQuery] = useState<string>();
    const [paymentTypeFilter, setPaymentTypeFilter] = useState<string | PaymentStatus>();

    const [orderDetailsVisibility, setOrderDetailsVisibility] = useState(false);


    async function handleFetchTicketOrders() {

        await fetchTicketOrders(user?.id as string)
            .then((response) => {
                setTicketOrders(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    async function handleFetchSingleTicketOrder() {
        // show loader
        setIsFetchingSingleTicketOrder(true);

        // construct data
        const data: FetchSingleTicketOrderRequest = {
            userId: user?.id as string,
            orderId: selectedTicketOrderId as string
        }

        await fetchTicketOrder(data)
            .then((response) => {
                setTicketOrder(response.data);
                setOrderDetailsVisibility(true);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsFetchingSingleTicketOrder(false);
                setSelectedTicketOrderId(undefined);
            })
    };

    useEffect(() => {
        if (!user) return;
        handleFetchTicketOrders();
        if (selectedTicketOrderId) {
            handleFetchSingleTicketOrder();
        }
    }, [user, selectedTicketOrderId]);

    useEffect(() => {
        if (searchQuery && ticketOrders) {
            let _filterResults = [];

            _filterResults = ticketOrders?.filter(order =>
                [order.contactEmail.toLowerCase() ?? '', order.event.title.toLowerCase()]
                    .some(
                        anyPropValue => anyPropValue.startsWith(searchQuery.toLowerCase()) ||
                            anyPropValue.includes(searchQuery.toLowerCase())
                    )).filter(payment => paymentTypeFilter ? payment.paymentStatus == paymentTypeFilter : payment) ??
                [];

            setFilteredOrders(_filterResults);
        } else {
            setFilteredOrders(undefined);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!paymentTypeFilter) return;

        const filterPayments = (status: PaymentStatus) => {
            return (filteredOrders || ticketOrders)?.filter(payment =>
                payment.paymentStatus === status &&
                (searchQuery ?
                    payment.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    payment.event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    : true)
            );
        };

        let _filterResults = filteredOrders;

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
                _filterResults = ticketOrders?.filter(order =>
                (searchQuery ?
                    order.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    : true)
                );;
                break;
        }

        setFilteredOrders(_filterResults);
    }, [paymentTypeFilter])

    return (
        <main className={styles.mainPageStyle}>
            {
                ticketOrder &&
                <OrderDetails
                    visibility={orderDetailsVisibility}
                    setVisibility={setOrderDetailsVisibility}
                    ticketOrder={ticketOrder}
                />
            }
            <div className="w-full flex flex-col gap-4 bg-transparent p-0">
                <div className="flex flex-col items-start md:flex-row md:justify-between">
                    <h3 className="text-2xl text-dark-grey font-medium">Ticket Orders</h3>


                    <div className='flex flex-row items-start gap-3'>
                        <select
                            onChange={(e) => {
                                setFilteredOrders(undefined);
                                setPaymentTypeFilter(e.target.value)
                            }}
                            className='text-dark-grey p-2 px-3 rounded-lg'>
                            <option className='p-2 bg-white' value={undefined}>All orders</option>
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
                                        setFilteredOrders(undefined);
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
                            <>Order ID</>,
                            <>Amount</>,
                            <>Reservation Date</>,
                            <>Quantity</>,
                            // <>Method</>,
                            <>Payment Status</>,
                            <>Action</>,
                        ]}
                        tableRowsData={
                            (filteredOrders || ticketOrders)?.map((ticketOrder, index) => [
                                <div className="flex items-center text-[#666666]">
                                    {/* <input type="checkbox" className="border border-mcNiff-primary" /> */}
                                    <span className="ml-2 text-sm w-48 text-wrap">{ticketOrder.contactEmail}</span>
                                </div>,
                                <span className="text-[#666666] text-left block max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">{ticketOrder.event.title}</span>,
                                <span className="text-[#666666] text-left">{ticketOrder.orderId}</span>,
                                <span className="text-[#666666]">{NairaPrice.format(Number(ticketOrder.totalPrice))}</span>,
                                <span className="text-[#666666] whitespace-nowrap">{moment(ticketOrder.createdAt).format("MMM D, YYYY | hh:mma")}</span>,
                                <span className="text-[#666666]">{ticketOrder.quantity}</span>,
                                // <span className="text-[#666666]">{ticketOrder.payments.length > 0 ? ticketOrder.payments[0].paymentServiceProvider : 'Not specified'}</span>,
                                <span className={styles.getStatusStyle(ticketOrder.paymentStatus)}>{serializer.paymentStatus(ticketOrder.paymentStatus)}</span>,
                                <div className='flex flex-row gap-1'>
                                    {/* <button className="p-2 px-4 bg-gray-200 text-dark-grey/80 text-xs rounded-full hover:opacity-55">
                                        Confirm
                                    </button> */}
                                    <button
                                        disabled={isFetchingSingleTicketOrder}
                                        className="p-1 text-dark-grey/80 text-xs hover:opacity-55 disabled:pointer-events-none disabled:opacity-80"
                                        onClick={() => setSelectedTicketOrderId(ticketOrder.orderId)}>
                                        {isFetchingSingleTicketOrder && selectedTicketOrderId === ticketOrder.orderId ? 'Loading...' : 'View details'}
                                    </button>
                                </div>
                            ]) ?? []
                        }
                        isLoading={isLoading}
                    ></Table>
                </div>
            </div>
        </main>
    );
}

export default OrdersPage;
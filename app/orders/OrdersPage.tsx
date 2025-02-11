"use client"
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { styles } from "../styles/styles";
import Table from "../components/ui/table";
import { useFetchTicketOrder, useFetchTicketOrders } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import { SingleTicketOrder, TicketOrderResponse } from "../models/ITicketOrder";
import { NairaPrice } from "../constants/priceFormatter";
import moment from "moment";
import { serializer } from "../constants/serializer";
import OrderDetailsModal from "../components/Modal/OrderDetailsModal";
import { PaymentStatus } from "../enums/IPaymentStatus";
import Input from "../components/ui/input";
import { Pagination } from "../components/ui/pagination";
import { PaginationMetaProps } from "../types/pagination";

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
    const [ticketOrdersMeta, setTicketOrdersMeta] = useState<PaginationMetaProps>();
    const [[page, limit], setPaginationMeta] = useState([1, 10]);
    const [ticketOrder, setTicketOrder] = useState<SingleTicketOrder | null>(null);
    const [selectedTicketOrderId, setSelectedTicketOrderId] = useState<string>();
    const [filteredOrders, setFilteredOrders] = useState<TicketOrderResponse[]>();
    const [searchQuery, setSearchQuery] = useState<string>();
    const [paymentTypeFilter, setPaymentTypeFilter] = useState<string | PaymentStatus>();

    const [orderDetailsVisibility, setOrderDetailsVisibility] = useState(false);

    async function handleFetchTicketOrders(page: number = 1, _searchQuery?: string) {

        setPaginationMeta([page, limit]);

        // show loader
        setIsLoading(true);

        await fetchTicketOrders(user?.token as string, page.toString(), limit.toString(), _searchQuery ?? searchQuery ?? '', paymentTypeFilter)
            .then((response) => {
                setTicketOrders(response.data.ticketOrders);
                setTicketOrdersMeta(response.data.meta);
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

        await fetchTicketOrder(selectedTicketOrderId as string, user?.token as string)
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
        if (selectedTicketOrderId) {
            handleFetchSingleTicketOrder();
        }
    }, [selectedTicketOrderId]);

    // Hook to filter ticket orders based on search query
    useEffect(() => {
        if (searchQuery && searchQuery.length > 3) {
            handleFetchTicketOrders(1, searchQuery);
        } else if (searchQuery === '') {
            handleFetchTicketOrders();
        }
    }, [searchQuery])

    useEffect(() => {
        handleFetchTicketOrders(1);
    }, [paymentTypeFilter])

    return (
        <main className={styles.mainPageStyle}>
            {
                ticketOrder &&
                <OrderDetailsModal
                    visibility={orderDetailsVisibility}
                    setVisibility={setOrderDetailsVisibility}
                    ticketOrder={ticketOrder}
                />
            }
            <div className="w-full flex flex-col gap-4 bg-transparent p-0">
                <div className="flex flex-col items-start md:flex-row md:justify-between">
                    <div>
                        <h3 className="text-2xl text-dark-grey font-medium">Ticket Orders</h3>
                        {ticketOrdersMeta && <p>Results: {ticketOrdersMeta?.total}</p>}
                    </div>


                    <div className='flex flex-row items-start gap-3'>
                        <select
                            onChange={(e) => {
                                setPaymentTypeFilter(e.target.value);
                            }}
                            className='text-dark-grey p-2 px-3 rounded-lg'>
                            <option className='p-2 bg-white' value={""}>All orders</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Pending}>Pending</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Paid}>Paid</option>
                            <option className='p-2 bg-white' value={PaymentStatus.Failed}>Failed</option>
                        </select>

                        <div className="text-dark-grey">
                            <Input
                                placeholder="Search for an event"
                                className="p-2 px-3 rounded-md mb-1"
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }}
                            />
                            <p className="text-sm text-dark-grey/50">Search using user email, order Id or event name</p>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl overflow-x-auto bg-white'>
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
                    <div className="flex justify-end mt-4 p-5">
                        {
                            ticketOrdersMeta && ticketOrdersMeta.totalPages > 1 &&
                            <Pagination
                                meta={{ ...ticketOrdersMeta, page }}
                                onPageChange={(page) => handleFetchTicketOrders(page)}
                            />
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OrdersPage;
"use client"
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Button from "../components/ui/button";
import { styles } from "../styles/styles";
import { useFetchEvents, useSendEmailToAllTicketOrderContacts } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import { EventResponse } from "../models/IEvent";
import moment from "moment";
import EmailInfoModal from "../components/Modal/EmailInfoModal";
import { IEventEmail } from "../models/IEmail";
import { toast } from "sonner";
import Input from "../components/ui/input";
import { PaginationMetaProps } from "../types/pagination";
import Table from "../components/ui/table";
import { Pagination } from "../components/ui/pagination";

interface EventsPageProps {

}

const EventsPage: FunctionComponent<EventsPageProps> = (): ReactElement => {
    const fetchEvents = useFetchEvents();
    const sendEmailToAllTicketOrderContacts = useSendEmailToAllTicketOrderContacts();

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isFetchingEvents, setIsFetchingEvents] = useState(true);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isEmailInfoModalVisible, setIsEmailInfoModalVisible] = useState(false);
    const [emailInfo, setEmailInfo] = useState<IEventEmail>();

    const [events, setEvents] = useState<EventResponse[]>();
    const [selectedEventInfo, setSelectedEventInfo] = useState<EventResponse>();
    const [selectedEventId, setSelectedEventId] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>();
    // const [eventInfoVisibilityModal, setEventInfoVisibilityModal] = useState(false);
    const [[page, limit], setPaginationMeta] = useState([1, 10]);
    const [eventsMeta, setEventsMeta] = useState<PaginationMetaProps>();

    const handleFetchEvents = async (page: number = 1, _searchQuery?: string) => {

        setPaginationMeta([page, limit]);

        // show loader
        setIsFetchingEvents(true);

        await fetchEvents(user?.token as string, page.toString(), limit.toString(), _searchQuery ?? searchQuery ?? '')
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response)
                setEvents(response.data.events);
                setEventsMeta(response.data.meta);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsFetchingEvents(false);
            });
    };

    const handleFetchSelectedEvent = async () => {
        await fetchEvents(user?.id as string, selectedEventId)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response)
                setSelectedEventInfo(response.data);
                // setEventInfoVisibilityModal(true);
            })
            .catch((error) => {
                // console.log("🚀 ~ .catch ~ error", error);
                catchError(error);
            })
            .finally(() => {
                setIsFetchingEvents(false);
            });
    };

    const handleSendEmailToAllTicketOrderContacts = async () => {
        setIsSendingEmail(true);
        await sendEmailToAllTicketOrderContacts(user?.id as string, emailInfo as IEventEmail)
            .then((response) => {
                toast.success("Email sent successfully");
                setIsEmailInfoModalVisible(false);
            })
            .catch((error) => {
                catchError(error);
                toast.error("Failed to send email");
            })
            .finally(() => {
                setIsSendingEmail(false);
            });
    };

    useEffect(() => {
        handleFetchEvents();
    }, [user]);

    useEffect(() => {
        if (selectedEventId) {
            handleFetchSelectedEvent()
        }
    }, [selectedEventId]);

    useEffect(() => {
        if (!isEmailInfoModalVisible) {
            setEmailInfo(undefined);
        }
    }, [isEmailInfoModalVisible]);

    useEffect(() => {
        if (searchQuery && searchQuery.length > 3) {
            handleFetchEvents(1, searchQuery);
        } else if (searchQuery === '') {
            handleFetchEvents();
        }
    }, [searchQuery])

    return (
        <>
            {/* <EventInfoModal
                visibility={true}
                setVisibility={() => { }}
            // event=
            /> */}
            <main className={styles.mainPageStyle}>
                <div className="w-full flex flex-col gap-4 bg-transparent p-0">
                    <div className="flex flex-row items-start justify-between w-full mb-4 mt-6">
                        <div>
                            <h3 className="text-2xl text-dark-grey font-medium">Events</h3>
                            {eventsMeta && <p>Results: {eventsMeta?.total}</p>}
                        </div>

                        <div className="text-dark-grey">
                            <Input
                                placeholder="Search for an event"
                                className="p-2 px-3 rounded-md mb-1"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <p className="text-sm text-dark-grey/50">Search using event name, <br />event ID, or publisher</p>
                        </div>
                    </div>


                    <div className='rounded-2xl overflow-x-auto bg-white'>
                        <Table
                            tableHeaderStyle="text-white"
                            tableHeaders={[
                                <div className="flex items-center">
                                    <span className="ml-2">Event publisher</span>
                                </div>,
                                <>Event name</>,
                                <>Event code</>,
                                <>Event date & time</>,
                                <>Attendees</>,
                                <>Revenue</>,
                                <>Coupons</>,
                                <>Tickets</>,
                                <>Actions</>,
                            ]}
                            tableRowsData={
                                events?.map((event, index) => [
                                    <div className="flex items-center text-[#666666]">
                                        {/* <input type="checkbox" className="border border-mcNiff-primary" /> */}
                                        <span className="ml-2 text-sm w-48 text-wrap">{event.publisher}</span>
                                    </div>,
                                    <span className="text-[#666666] text-left">{event.title}</span>,
                                    <span className="text-[#666666]">{event.eventId}</span>,
                                    <span className="text-[#666666]">{moment(event.date).format("DD MMM YYYY")} {moment(event.date).format("hh:mm a")}</span>,
                                    <span className="text-[#666666] whitespace-nowrap flex flex-row justify-between">
                                        {event.numberOfTicketOrders}
                                        <Button minBtn
                                            onClick={() => {
                                                setSelectedEventInfo(event);
                                                setEmailInfo({ ...emailInfo as IEventEmail, eventId: event.id });
                                                setIsEmailInfoModalVisible(true);
                                            }}
                                            disabled={event.numberOfTicketOrders === 0}
                                            className={`!bg-primary !py-1 !px-2 !text-white whitespace-nowrap ${event.numberOfTicketOrders === 0 ? "!opacity-40" : ""}`}>
                                            Send email
                                        </Button>
                                    </span>,
                                    <span className="text-[#666666]">{event.revenue.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</span>,
                                    <span className="text-[#666666]">{event.numberOfCouponCodes}</span>,
                                    <span className="text-[#666666]">{event.numberOfTickets}</span>,
                                    <div className='flex flex-row gap-1'>
                                        <Button
                                            minBtn
                                            onClick={() => setSelectedEventId(event.id)}
                                            className="!bg-light-grey !text-dark-grey whitespace-nowrap">
                                            View details
                                        </Button>
                                    </div>
                                ]) ?? []
                            }
                            isLoading={isFetchingEvents}
                        ></Table>
                        <div className="flex justify-end mt-4 p-5">
                            {
                                eventsMeta && eventsMeta.totalPages > 1 &&
                                <Pagination
                                    meta={{ ...eventsMeta, page }}
                                    onPageChange={(page) => handleFetchEvents(page)}
                                />
                            }
                        </div>
                    </div>

                    {/* <div className="bg-white text-dark-grey w-full rounded-2xl p-5">
                        <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-[60vh] overflow-y-auto hideScrollBar">
                            <table className="">
                                <tbody>
                                    <tr>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event publisher</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event name</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event code</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Attendees</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Revenue</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Coupons</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Tickets</th>
                                        <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                                    </tr>
                                    {
                                        (filteredEvents || events)?.map((event, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.publisher}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.title}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.eventId}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row justify-between">
                                                        {event.numberOfTicketOrders}
                                                        <Button minBtn
                                                            onClick={() => {
                                                                setSelectedEventInfo(event);
                                                                setEmailInfo({ ...emailInfo as IEventEmail, eventId: event.id });
                                                                setIsEmailInfoModalVisible(true);
                                                            }}
                                                            disabled={event.numberOfTicketOrders === 0}
                                                            className={`!bg-primary !py-1 !px-2 !text-white whitespace-nowrap ${event.numberOfTicketOrders === 0 ? "!opacity-40" : ""}`}>
                                                            Send email
                                                        </Button>
                                                    </td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.revenue.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.numberOfCouponCodes}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.numberOfTickets}</td>
                                                    <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                        <Button
                                                            minBtn
                                                            onClick={() => setSelectedEventId(event.id)}
                                                            className="!bg-light-grey !text-dark-grey whitespace-nowrap">
                                                            View details
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </main>

            <EmailInfoModal
                visibility={isEmailInfoModalVisible}
                setVisibility={setIsEmailInfoModalVisible}
                handleSendEmailToAllTicketOrderContacts={handleSendEmailToAllTicketOrderContacts}
                selectedEvent={selectedEventInfo}
                isSendingEmail={isSendingEmail}
                emailInfo={emailInfo}
                setEmailInfo={setEmailInfo}
            />
        </>
    );
}

export default EventsPage;
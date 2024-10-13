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
import EventInfoModal from "../components/Modal/EventInfoModal";
import Input from "../components/ui/input";

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
    const [filteredEvents, setFilteredEvents] = useState<EventResponse[]>();
    const [selectedEventInfo, setSelectedEventInfo] = useState<EventResponse>();
    const [selectedEventId, setSelectedEventId] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>();
    const [eventInfoVisibilityModal, setEventInfoVisibilityModal] = useState(false);

    const handleFetchEvents = async () => {
        await fetchEvents(user?.id as string)
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                // console.log("🚀 ~ .catch ~ error", error);
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
                setEventInfoVisibilityModal(true);
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
        if (searchQuery) {
            let _filterResults = [];

            _filterResults = events?.filter(event =>
                [event.title.toLowerCase(), event.eventId.toLowerCase(), event.publisher.toLowerCase()]
                    .some(
                        anyPropValue => anyPropValue.startsWith(searchQuery.toLowerCase()) ||
                            anyPropValue.includes(searchQuery.toLowerCase())
                    )) ??
                [];

            setFilteredEvents(_filterResults);
        } else {
            setFilteredEvents(undefined);
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
                <div className="flex flex-row items-start justify-between w-full mb-4 mt-6">
                    <h3 className="text-2xl text-dark-grey font-medium">Events</h3>

                    <div className="text-dark-grey">
                        <Input
                            placeholder="Search for an event"
                            className="p-2 px-3 rounded-md mb-1"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <p className="text-sm text-dark-grey/50">Search using event name, <br />event ID, or publisher</p>
                    </div>
                </div>

                <div className="bg-white text-dark-grey w-full rounded-2xl p-5">
                    <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-[60vh] overflow-y-auto hideScrollBar">
                        <table className="">
                            <tbody>
                                <tr>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event publisher</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event name</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event code</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Date & time</th>
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
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{moment(event.date).format("DD MMM YYYY")} {event.time.toLowerCase()}</td>
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
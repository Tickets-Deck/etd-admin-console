"use client"
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Button from "../components/ui/button";
import { styles } from "../styles/styles";
import { useFetchEvents } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import { EventResponse } from "../models/IEvent";

interface EventsPageProps {

}

const EventsPage: FunctionComponent<EventsPageProps> = (): ReactElement => {
    const fetchEvents = useFetchEvents();
    const { data: session, status } = useSession();
    const user = session?.user;

    const [isFetchingEvents, setIsFetchingEvents] = useState(true);
    const [events, setEvents] = useState<EventResponse[]>();

    const handleFetchEvents = async () => {
        await fetchEvents(user?.id as string)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response.data);
                setEvents(response.data);
            })
            .catch((error) => {
                console.log("🚀 ~ .catch ~ error", error)
                catchError(error);
            })
            .finally(() => {
                setIsFetchingEvents(false);
            });
    };

    useEffect(() => {
        handleFetchEvents();
    }, [user]);

    return (
        <main className={styles.mainPageStyle}>
            <div className="flex flex-col items-start w-full mb-4 mt-6">
                <h3 className="text-2xl text-dark-grey font-medium">Events</h3>
            </div>

            <div className="bg-white text-dark-grey w-full rounded-2xl p-5">
                <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-80 overflow-y-auto hideScrollBar">
                    <table className="">
                        <tbody>
                            <tr>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event code</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Attendees</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Type</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                            </tr>
                            {
                                events?.map((event, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.title}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.eventId}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{event.ticketOrdersCount}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">0</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                <Button minBtn className="!bg-light-grey !text-dark-grey whitespace-nowrap">View details</Button>
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
    );
}

export default EventsPage;
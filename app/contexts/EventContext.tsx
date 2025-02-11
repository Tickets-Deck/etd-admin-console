import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useOnline } from "../hooks/useOnline";
import { AdminUser } from "../models/IAdminUser";
import { useFetchAdminUser, useFetchEvents } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";
import { EventResponse } from "../models/IEvent";
import { PaginationMetaProps } from "../types/pagination";

// Define the type for the context data
export type EventContextData = {
    events: EventResponse[] | undefined
    isFetchingEvents: boolean
    searchQuery: string | undefined
    setSearchQuery: Dispatch<SetStateAction<string | undefined>>
    page: number
    limit: number
    setPaginationMeta: Dispatch<SetStateAction<[number, number]>>
    eventsMeta: PaginationMetaProps | undefined
    setEventsMeta: Dispatch<SetStateAction<PaginationMetaProps | undefined>>
    handleFetchEvents: (page?: number, _searchQuery?: string) => Promise<void>
};

// Create a context with the specified data type
const EventContext = createContext<EventContextData | undefined>(undefined);

// Create a provider component that takes children as props
type EventContextProviderProps = {
    children: ReactNode;
};

const EventContextProvider: FunctionComponent<EventContextProviderProps> = ({ children }) => {

    const fetchEvents = useFetchEvents();
    const { data: session } = useSession();
    const user = session?.user;

    const [events, setEvents] = useState<EventResponse[]>();
    const [isFetchingEvents, setIsFetchingEvents] = useState(false);

    const [searchQuery, setSearchQuery] = useState<string>();
    const [[page, limit], setPaginationMeta] = useState([1, 10]);
    const [eventsMeta, setEventsMeta] = useState<PaginationMetaProps>();

    const isOnline = useOnline();

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

    useEffect(() => {
        if (!user) return;
        handleFetchEvents();
    }, [user]);

    // Define the values you want to share
    const sharedData: EventContextData = {
        events,
        isFetchingEvents,
        searchQuery,
        setSearchQuery,
        page,
        limit,
        setPaginationMeta,
        eventsMeta,
        setEventsMeta,
        handleFetchEvents
    };

    return (
        <EventContext.Provider value={sharedData}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContextProvider, EventContext };

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error("useEventContext must be used within a EventContextProvider");
    }
    return context;
}
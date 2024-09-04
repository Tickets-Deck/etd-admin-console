import { FunctionComponent, ReactElement } from "react";
import EventsPage from "./EventsPage";

interface EventsProps {

}

const Events: FunctionComponent<EventsProps> = (): ReactElement => {
    return (
        <EventsPage />
    );
}

export default Events;
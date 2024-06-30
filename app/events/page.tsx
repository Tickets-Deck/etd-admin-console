import { FunctionComponent, ReactElement } from "react";
import { styles } from "../styles/styles";

interface EventsProps {

}

const Events: FunctionComponent<EventsProps> = (): ReactElement => {
    return (
        <main className={styles.mainPageStyle}>
            Events
        </main>
    );
}

export default Events;
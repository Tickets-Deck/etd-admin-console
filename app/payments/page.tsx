import { FunctionComponent, ReactElement } from "react";
import { styles } from "../styles/styles";

interface PaymentsProps {

}

const Payments: FunctionComponent<PaymentsProps> = (): ReactElement => {
    return (
        <main className={styles.mainPageStyle}>
            Payments
        </main>
    );
}

export default Payments;
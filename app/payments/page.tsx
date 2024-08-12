import { FunctionComponent, ReactElement } from "react";
import PaymentPage from "./PaymentPage";

interface PaymentsProps {

}

const Payments: FunctionComponent<PaymentsProps> = (): ReactElement => {
    return (
        <PaymentPage />
    );
}

export default Payments;
import styles from "./Payments.module.css";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";

type PaymentsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Payments = ({ currentUser, searchParams }: PaymentsProps) => {
    return (
        <Card gridArea="payments" title="Payment History">
            <h1>hello</h1>
        </Card>
    );
};

export default Payments;

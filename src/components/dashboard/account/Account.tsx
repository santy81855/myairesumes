import styles from "./Account.module.css";
import Plan from "./plan-details/Plan";
import Bill from "./bill/Bill";
import Upgrade from "./upgrade/Upgrade";
import Payments from "./payments/Payments";

type AccountProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Account = ({ currentUser, searchParams }: AccountProps) => {
    const { status } = currentUser;
    return (
        <main className={styles.container}>
            <Plan currentUser={currentUser} searchParams={searchParams} />
            <Bill currentUser={currentUser} searchParams={searchParams} />
            {status === "free" && (
                <Upgrade
                    currentUser={currentUser}
                    searchParams={searchParams}
                />
            )}
            <Payments currentUser={currentUser} searchParams={searchParams} />
        </main>
    );
};

export default Account;

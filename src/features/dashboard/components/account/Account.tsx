import styles from "./Account.module.css";
import Plan from "./plan-details/Plan";
import Bill from "./bill/Bill";
import Upgrade from "./upgrade/Upgrade";
import Payments from "./payments/Payments";
import Tutorial from "@/components/modals/tutorial/Tutorial";

type AccountProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Account = ({ currentUser, searchParams }: AccountProps) => {
    const { status } = currentUser;
    const showTutorial = searchParams?.tutorial === "true";
    return (
        <main className={styles.container} id="account-page">
            <Plan currentUser={currentUser} searchParams={searchParams} />
            <Bill currentUser={currentUser} searchParams={searchParams} />
            {status === "free" && (
                <Upgrade
                    currentUser={currentUser}
                    searchParams={searchParams}
                />
            )}
            <Payments currentUser={currentUser} searchParams={searchParams} />
            {showTutorial && <Tutorial />}
        </main>
    );
};

export default Account;

import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import TitleSection from "@/components/dashboard/title-section/TitleSection";
import Profile from "@/components/dashboard/profile/Profile";
import Account from "@/components/dashboard/account/Account";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper/DashboardWrapper";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Navbar from "@/components/nav/Navbar";
import StaticModal from "@/components/static-modal/StaticModal";
import UpdateModal from "@/components/dashboard/account/update-payment-modal/UpdateModal";
import UpgradeModal from "@/components/dashboard/account/upgrade-plan-modal/UpgradeModal";
import DowngradeModal from "@/components/dashboard/account/downgrade-modal/DowngradeModal";
import ReinstateModal from "@/components/dashboard/account/bill/reinstate-modal/ReintstateModal";

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the current user
    const currentUser = await getUser(user.id);
    // if there is no menu query param, add it and set it to profile
    if (searchParams && !("menu" in searchParams)) {
        redirect("/dashboard?menu=profile");
    }
    const menuSection = searchParams?.menu || "";
    const editPayment = searchParams?.editPayment || false;
    const upgradePlan = searchParams?.upgradePlan || false;
    const downgradePlan = searchParams?.downgradePlan || false;
    const reinstatePlan = searchParams?.reinstatePlan || false;

    return (
        <DashboardWrapper>
            <Sidebar />
            <section className={styles.rightSideContainer}>
                <Navbar
                    style={{
                        backgroundColor: "#f4e9ff",
                        color: "black",
                    }}
                />
                <main className={styles.main}>
                    <p
                        className={`${styles.topHeading} ${styles.largeHeading}`}
                    >
                        DASH
                    </p>
                    <p
                        className={`${styles.bottomHeading} ${styles.largeHeading}`}
                    >
                        BOARD
                    </p>
                    <TitleSection currentUser={currentUser} />
                    {menuSection === "profile" && (
                        <Profile
                            currentUser={currentUser}
                            searchParams={searchParams}
                            key="profileSection"
                        />
                    )}
                    {menuSection === "account" && (
                        <Account
                            currentUser={currentUser}
                            searchParams={searchParams}
                            key="accountSection"
                        />
                    )}
                    <div className={styles.circle}></div>
                </main>
            </section>
            {editPayment && (
                <StaticModal>
                    <UpdateModal />
                </StaticModal>
            )}
            {upgradePlan && (
                <StaticModal>
                    <UpgradeModal />
                </StaticModal>
            )}
            {downgradePlan && (
                <StaticModal>
                    <DowngradeModal />
                </StaticModal>
            )}
            {reinstatePlan && (
                <StaticModal>
                    <ReinstateModal />
                </StaticModal>
            )}
        </DashboardWrapper>
    );
};

export default Page;

import styles from "./page.module.css";
import { validateRequest } from "@/features/authentication/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import {
    TitleSection,
    Sidebar,
    DashboardWrapper,
    Account,
    Profile,
    Resumes,
    CoverLetters,
} from "@/features/dashboard";
import Navbar from "@/components/nav/Navbar";
import StaticModal from "@/components/static-modal/StaticModal";
import UpdateModal from "@/components/modals/payment/update-payment-modal/UpdateModal";
import UpgradeModal from "@/components/modals/payment/upgrade-plan-modal/UpgradeModal";
import DowngradeModal from "@/components/modals/payment/downgrade-modal/DowngradeModal";
import ReinstateModal from "@/components/modals/payment/reinstate-modal/ReintstateModal";
import CreateResumeModal from "@/components/modals/document/create-resume/CreateResumeModal";
import CreateCoverLetterModal from "@/components/modals/document/create-cover-letter/CreateCoverLetterModal";
import { UpdateUrl } from "@/lib/updateUrl";

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
        redirect(
            UpdateUrl(
                searchParams ? searchParams : {},
                [{ key: "menu", value: "profile" }],
                "/dashboard"
            )
        );
    }
    const menuSection = searchParams?.menu || "";
    const editPayment = searchParams?.editPayment || false;
    const upgradePlan = searchParams?.upgradePlan || false;
    const downgradePlan = searchParams?.downgradePlan || false;
    const reinstatePlan = searchParams?.reinstatePlan || false;
    const createResume = searchParams?.createResume || false;
    const createCoverLetter = searchParams?.createCoverLetter || false;

    return (
        <DashboardWrapper>
            <Sidebar />
            <section className={styles.rightSideContainer}>
                <Navbar
                    style={{
                        backgroundColor: "white",
                        color: "black",
                    }}
                />
                <main className={styles.main}>
                    <p
                        className={`${styles.topHeading} ${styles.largeHeading}`}
                    >
                        {currentUser?.firstName}
                    </p>
                    <p
                        className={`${styles.bottomHeading} ${styles.largeHeading}`}
                    >
                        {currentUser?.lastName}
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
                    {menuSection === "resumes" && (
                        <Resumes
                            key="resumesSection"
                            currentUser={currentUser}
                            searchParams={searchParams}
                        />
                    )}
                    {menuSection === "cover-letters" && (
                        <CoverLetters
                            key="coverLettersSection"
                            currentUser={currentUser}
                            searchParams={searchParams}
                        />
                    )}
                    <div className={styles.circle}></div>
                </main>
            </section>
            {editPayment && (
                <StaticModal>
                    <UpdateModal returnUrl="/dashboard?menu=account&invoicePage=1" />
                </StaticModal>
            )}
            {upgradePlan && (
                <StaticModal>
                    <UpgradeModal returnUrl="/dashboard?menu=account&invoicePage=1" />
                </StaticModal>
            )}
            {downgradePlan && (
                <StaticModal>
                    <DowngradeModal returnUrl="/dashboard?menu=account&invoicePage=1" />
                </StaticModal>
            )}
            {reinstatePlan && (
                <StaticModal>
                    <ReinstateModal returnUrl="/dashboard?menu=account&invoicePage=1" />
                </StaticModal>
            )}
            {createResume && (
                <StaticModal>
                    <CreateResumeModal returnUrl="/dashboard?menu=resumes" />
                </StaticModal>
            )}
            {createCoverLetter && (
                <StaticModal>
                    <CreateCoverLetterModal returnUrl="/dashboard?menu=cover-letters" />
                </StaticModal>
            )}
        </DashboardWrapper>
    );
};

export default Page;

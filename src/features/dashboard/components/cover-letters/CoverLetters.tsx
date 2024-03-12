import styles from "./CoverLetters.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserCoverLetters } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { plusIconCircled } from "@/components/icons/iconSVG";

type CoverLetterProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
};

const CoverLetters = async ({
    currentUser,
    searchParams,
    documents,
}: CoverLetterProps) => {
    return (
        <main className={styles.container}>
            <DashboardCard key="cover-letter-card" title="Cover Letters">
                {!documents && <LoadingScreen />}
                <Link
                    className={styles.addItemButton}
                    href={UpdateUrl(
                        searchParams ? searchParams : {},
                        [
                            { key: "menu", value: "cover-letters" },
                            { key: "createCoverLetter", value: "true" },
                        ],
                        "/dashboard"
                    )}
                >
                    {plusIconCircled}
                    <p>Create New Cover Letter</p>
                </Link>
                {documents.length > 0 ? (
                    <DocumentCardDisplay
                        searchParams={searchParams}
                        documents={documents}
                        type="cover-letter"
                    />
                ) : (
                    <p className={styles.noJobs}>
                        You don't have any cover letters yet. Click the button
                        above to create a new cover letter.
                    </p>
                )}
            </DashboardCard>
        </main>
    );
};

export default CoverLetters;

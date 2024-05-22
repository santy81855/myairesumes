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
                {documents.length > 0 ? (
                    <DocumentCardDisplay
                        searchParams={searchParams}
                        documents={documents}
                        type="cover-letter"
                    />
                ) : (
                    <p className={styles.noJobs}>
                        You don&apos;t have any cover letters yet.
                    </p>
                )}
            </DashboardCard>
        </main>
    );
};

export default CoverLetters;

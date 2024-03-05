import styles from "./CoverLetters.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserCoverLetters } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type CoverLetterProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const CoverLetters = async ({
    currentUser,
    searchParams,
}: CoverLetterProps) => {
    const coverLetters = await getAllUserCoverLetters(currentUser.id);

    const addCoverLetterButton = (
        <Link
            href={UpdateUrl(
                searchParams ? searchParams : {},
                [
                    { key: "menu", value: "cover-letters" },
                    { key: "createCoverLetter", value: "true" },
                ],
                "/dashboard"
            )}
        >
            Add Cover Letter
        </Link>
    );
    return (
        <main className={styles.container}>
            <DashboardCard key="cover-letter-card" title="Cover Letters">
                {!coverLetters && <LoadingScreen />}
                {addCoverLetterButton}
                {coverLetters && (
                    <DocumentCardDisplay
                        documents={coverLetters}
                        type="cover-letter"
                    />
                )}
            </DashboardCard>
        </main>
    );
};

export default CoverLetters;

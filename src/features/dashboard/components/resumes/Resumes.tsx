import styles from "./Resumes.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserResumes } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type ResumesProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
};

const Resumes = async ({
    documents,
    currentUser,
    searchParams,
}: ResumesProps) => {
    const addResumeButton = (
        <Link
            href={UpdateUrl(
                searchParams ? searchParams : {},
                [
                    { key: "menu", value: "resumes" },
                    { key: "createResume", value: "true" },
                ],
                "/dashboard"
            )}
        >
            Add Resume
        </Link>
    );
    return (
        <main className={styles.container}>
            <DashboardCard key="resumes-card" title="Resumes">
                {!documents && <LoadingScreen />}
                {addResumeButton}
                {documents.length > 0 && (
                    <DocumentCardDisplay
                        searchParams={searchParams}
                        documents={documents}
                        type="resume"
                    />
                )}
            </DashboardCard>
        </main>
    );
};

export default Resumes;

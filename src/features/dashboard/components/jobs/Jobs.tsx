import styles from "./Jobs.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserResumes } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type JobsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
};

const Jobs = async ({ currentUser, searchParams, documents }: JobsProps) => {
    const addResumeButton = (
        <Link
            href={UpdateUrl(
                searchParams ? searchParams : {},
                [{ key: "createJob", value: "true" }],
                "/dashboard"
            )}
        >
            Add job
        </Link>
    );
    return (
        <main className={styles.container}>
            <DashboardCard key="jobs-card" title="Your Jobs">
                {addResumeButton}
                {documents.length > 0 && (
                    <DocumentCardDisplay
                        searchParams={searchParams}
                        documents={documents}
                        type="job"
                    />
                )}
            </DashboardCard>
        </main>
    );
};

export default Jobs;

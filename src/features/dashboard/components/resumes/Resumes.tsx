import styles from "./Resumes.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserResumes } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { plusIconCircled } from "@/components/icons/iconSVG";

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
    return (
        <main className={styles.container}>
            <DashboardCard key="resumes-card" title="Resumes">
                {!documents && <LoadingScreen />}
                <Link
                    className={styles.addItemButton}
                    href={UpdateUrl(
                        searchParams ? searchParams : {},
                        [
                            { key: "menu", value: "resumes" },
                            { key: "createResume", value: "true" },
                        ],
                        "/dashboard"
                    )}
                >
                    {plusIconCircled}
                    <p>Create New Resume</p>
                </Link>
                {documents.length > 0 ? (
                    <DocumentCardDisplay
                        searchParams={searchParams}
                        documents={documents}
                        type="resume"
                    />
                ) : (
                    <p className={styles.noJobs}>
                        You don&apos;t have any resumes yet. Click the button
                        above to create a new resume.
                    </p>
                )}
            </DashboardCard>
        </main>
    );
};

export default Resumes;

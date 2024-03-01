import styles from "./Resumes.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserResumes } from "@/features/editor";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type ResumesProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Resumes = async ({ currentUser, searchParams }: ResumesProps) => {
    const resumes = await getAllUserResumes(currentUser.id);

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
                {!resumes && <LoadingScreen />}
                {addResumeButton}
                {resumes && <DocumentCardDisplay documents={resumes} />}
            </DashboardCard>
        </main>
    );
};

export default Resumes;

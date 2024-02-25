import styles from "./Resumes.module.css";
import { DashboardCard } from "@/features/dashboard";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import { getAllUserResumes } from "@/features/editor";
import Basic from "@/components/resume-templates/basic/Basic";

type ResumesProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Resumes = async ({ currentUser, searchParams }: ResumesProps) => {
    const resumes = await getAllUserResumes(currentUser.id);
    console.log(resumes);

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
                <section className={styles.resumesContainer}>
                    {resumes.map((resume: any) => {
                        return (
                            <section
                                className={styles.resumeCard}
                                key={resume.id}
                            >
                                {resume.information.sectionOrder}
                            </section>
                        );
                    })}
                </section>
            </DashboardCard>
        </main>
    );
};

export default Resumes;

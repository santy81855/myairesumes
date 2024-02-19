import styles from "./Resumes.module.css";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";

type ResumesProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Resumes = ({ currentUser, searchParams }: ResumesProps) => {
    return (
        <main className={styles.container}>
            <Card key="resumes-card" title="Resumes">
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
            </Card>
        </main>
    );
};

export default Resumes;

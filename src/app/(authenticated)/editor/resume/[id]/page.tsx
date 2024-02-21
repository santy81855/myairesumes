import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

import { getResume } from "@/lib/resume";
import dynamic from "next/dynamic";

const AddPage = dynamic(
    () => import("@/components/editor/add-page-button/AddPage"),
    { ssr: false }
);
const PageUtilBar = dynamic(
    () => import("@/components/editor/page-util-bar/PageUtilBar"),
    { ssr: false }
);
const DocumentContainer = dynamic(
    () => import("@/components/editor/document-container/DocumentContainer"),
    { ssr: false }
);

const Page = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the slug from the params
    const { id } = params;
    const resume = await getResume(user.id, id);

    return (
        <main className={styles.main}>
            <PageUtilBar resumeId={id} />
            <DocumentContainer resume={resume} />
            <AddPage resumeId={id} />
        </main>
    );
};

export default Page;

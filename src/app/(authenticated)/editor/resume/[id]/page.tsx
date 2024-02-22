import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getResume } from "@/lib/resume";

import PageUtilBar from "@/components/editor/page-util-bar/PageUtilBar";
import DocumentContainer from "@/components/editor/document-container/DocumentContainer";

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
            <PageUtilBar documentId={id} />
            <DocumentContainer document={resume} />
        </main>
    );
};

export default Page;

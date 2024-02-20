import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import DocumentContainer from "@/components/editor/document-container/DocumentContainer";
import AddPage from "@/components/editor/add-page-button/AddPage";
import PageUtilBar from "@/components/editor/page-util-bar/PageUtilBar";
import { getResume } from "@/lib/resume";

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
            <AddPage />
        </main>
    );
};

export default Page;

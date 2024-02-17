import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import DocumentContainer from "@/components/editor/document-container/DocumentContainer";
import AddPage from "@/components/editor/add-page-button/AddPage";
import PageCounter from "@/components/editor/page-counter/PageCounter";
import Placeholder from "@/components/resume-placeholder/Placeholder";
import Basic from "@/components/resume-templates/basic/Basic";
import DownloadButton from "@/components/editor/download-button/DownloadButton";

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

    return (
        <main className={styles.main}>
            <PageCounter />
            <DocumentContainer>
                <Basic />
            </DocumentContainer>
            <AddPage />
        </main>
    );
};

export default Page;

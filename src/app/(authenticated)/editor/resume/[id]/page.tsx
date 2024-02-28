import styles from "./page.module.css";
import { validateRequest } from "@/features/authentication/lib/auth";
import { redirect } from "next/navigation";
import {
    AddSectionModal,
    DocumentContainer,
    getResume,
    PageUtilBar,
} from "@/features/editor";

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
    //<PageUtilBar documentId={id} />
    return (
        <main className={styles.main}>
            <DocumentContainer document={resume} />
        </main>
    );
};

export default Page;

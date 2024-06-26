import styles from "./page.module.css";
import { validateRequest } from "@/features/authentication/lib/auth";
import { redirect } from "next/navigation";
import {
    DocumentContainer,
    getResume,
    getCoverLetter,
    PageUtilBar,
    LastSavedDisplay,
} from "@/features/editor";
import Tutorial from "@/components/modals/tutorial/Tutorial";

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string[] };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    if (
        params.slug.length < 2 ||
        (params.slug.length > 2 &&
            params.slug.length >= 3 &&
            params.slug[2] !== "tutorial")
    ) {
        redirect("/");
    }
    const documentType = params.slug[0];
    const id = params.slug[1];
    if (documentType !== "resume" && documentType !== "cover-letter") {
        redirect("/");
    }

    const document =
        documentType === "resume"
            ? await getResume(user.id, id)
            : await getCoverLetter(user.id, id);

    if (!document) {
        if (documentType === "resume") {
            redirect("/dashboard?menu=resumes");
        } else {
            redirect("/dashboard?menu=cover-letters");
        }
    }

    return (
        <main className={styles.main}>
            <PageUtilBar documentId={id} />
            <DocumentContainer document={document} type={documentType} />
            <LastSavedDisplay document={document} />
        </main>
    );
};

export default Page;

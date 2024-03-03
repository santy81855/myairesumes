import styles from "./page.module.css";
import { validateRequest } from "@/features/authentication/lib/auth";
import { redirect } from "next/navigation";
import {
    AddSectionModal,
    DocumentContainer,
    getResume,
    getCoverLetter,
    PageUtilBar,
} from "@/features/editor";

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
    if (params.slug.length < 2 || params.slug.length > 2) {
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

    return (
        <main className={styles.main}>
            <PageUtilBar documentId={id} />
            <DocumentContainer document={document} />
        </main>
    );
};

export default Page;

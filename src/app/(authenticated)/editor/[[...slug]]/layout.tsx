import type { Metadata } from "next";
import styles from "./layout.module.css";
import Navbar from "@/components/nav/Navbar";
import { validateRequest } from "@/features/authentication/lib/auth";
import {
    AddSectionModal,
    getResume,
    getCoverLetter,
    SideMenu,
    TitleBar,
    SubTitleBar,
} from "@/features/editor";
import { redirect } from "next/navigation";
import { ResumeContext } from "@/app/providers";
import { getUser } from "@/lib/user";
import Tutorial from "@/components/modals/tutorial/Tutorial";

export const metadata: Metadata = {
    title: "My Resume Hero - Editor",
    description: "Create and edit your resume with our AI-powered editor",
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string[] };
}) {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }

    if (!params.slug) redirect("/dashboard");

    var showTutorial = false;
    if (params.slug.length === 3 && params.slug[2] === "tutorial") {
        showTutorial = true;
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
    if (documentType !== "resume" && documentType !== "cover-letter") {
        redirect("/");
    }
    const currentUser = user ? await getUser(user.id) : null;

    return (
        <>
                <ResumeContext>
                    <AddSectionModal />
                    <Navbar
                        style={{ backgroundColor: "#faf9f6", color: "#202520" }}
                    />
                    <section className={styles.rowContainer}>
                        <SideMenu user={currentUser} />
                        <section
                            className={styles.columnContainer}
                            id="editor-page"
                        >
                            <TitleBar />
                            <SubTitleBar />
                            {children}
                            {showTutorial && <Tutorial />}
                        </section>
                    </section>
                </ResumeContext>
        </>
    );
}

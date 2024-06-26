import type { Metadata } from "next";
import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({
    subsets: ["latin"],
    weight: "300",
});
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
        <html lang="en">
            <body className={poppins.className}>
                <ResumeContext>
                    <AddSectionModal />
                    <Navbar
                        style={{ backgroundColor: "black", color: "white" }}
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
            </body>
        </html>
    );
}

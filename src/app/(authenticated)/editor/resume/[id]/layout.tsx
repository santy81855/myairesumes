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
import SideMenu from "@/components/editor/side-menu/SideMenu";
import TitleBar from "@/components/editor/title-bar/TitleBar";
import Navbar from "@/components/nav/Navbar";
import { getResume } from "@/lib/resume";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ResumeContext } from "@/app/providers";

export const metadata: Metadata = {
    title: "My AI Resumes - Editor",
    description: "Create and edit your resume with our AI-powered editor",
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    const resume = await getResume(user.id, params.id);

    return (
        <html lang="en">
            <body className={poppins.className}>
                <Navbar style={{ backgroundColor: "black", color: "white" }} />
                <ResumeContext>
                    <section className={styles.rowContainer}>
                        <SideMenu />
                        <section className={styles.columnContainer}>
                            <TitleBar />
                            {children}
                        </section>
                    </section>
                </ResumeContext>
            </body>
        </html>
    );
}

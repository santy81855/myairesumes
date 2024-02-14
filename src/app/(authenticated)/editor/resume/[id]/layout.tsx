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

export const metadata: Metadata = {
    title: "My AI Resumes - Editor",
    description: "Create and edit your resume with our AI-powered editor",
};

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <section className={styles.rowContainer}>
                    <SideMenu />
                    <section className={styles.columnContainer}>
                        <TitleBar />
                        {children}
                    </section>
                </section>
            </body>
        </html>
    );
}

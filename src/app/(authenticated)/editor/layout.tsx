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
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
    title: "My AI Resumes - Editor",
    description: "Create and edit your resume with our AI-powered editor",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}

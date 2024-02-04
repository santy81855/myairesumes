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
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
    title: "My AI Resumes - Dashboard",
    description: "Create professional resumes in minutes with AI",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                    <Sidebar />
                    <div style={{ width: "100%", height: "100%" }}>
                        <Navbar
                            style={{
                                backgroundColor: "#f5f5f5",
                                color: "#a183cf",
                            }}
                        />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}

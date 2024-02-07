import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "@/app/globals.css";
import Navbar from "@/components/nav/Navbar";
import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "My AI Resumes - Pricing",
    description: "Choose the best plan for you!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <Navbar
                    style={{ backgroundColor: "#3864FF", color: "white" }}
                />
                {children}
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "@/app/globals.css";
import Navbar from "@/components/nav/Navbar";
import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "My Resume Hero - Pricing",
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
                <Navbar style={{ backgroundColor: "white", color: "black" }} />
                {children}
            </body>
        </html>
    );
}

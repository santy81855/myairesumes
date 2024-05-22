import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";

import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({
    subsets: ["latin"],
    weight: "300",
});

export const metadata: Metadata = {
    title: "My Resume Hero",
    description: "Create professional resumes in minutes with AI",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";

import localFont from "next/font/local";
const inter = localFont({
    src: "../../public/fonts/inter.ttf",
    display: "swap",
    weight: "100 900",
    variable: "--font-inter",
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
            <body className={`${inter.className} ${inter.variable}`}>
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}
